<template>
    <div class="main">
        <Metadata
            :name="name"
            :width="width"
            :height="height"
            :language="language"
            :cloud_status="cloud_status"
            :team_id="team_id"
        />
        <div class="bottom">
            <SlideView
                :slides="slides"
                :width="width"
                :height="height"
                @new_slide="new_slide"
                @select="select_slide"
                @delete_slide="delete_slide"
                :language="language"
            />
            <SlideEditor
                :slide="slides[selected_slide_index]"
                :width="width" 
                :height="height"
                :language="language"
                @drag="drag"
                @resize="resize"
                @rotate="rotate"
                @content="content"
                @delete="delete_el"
                @new_elem="new_elem"
                @styles="styles"
            />
        </div>
    </div>
</template>

<style scoped>
    .main {
        width: 100vw;
        height: 92.2vh;
        display: flex;
        flex-flow: column nowrap;
    }

    .bottom {
        flex-grow: 1;
        display: flex;
        flex-flow: row nowrap;
    }
</style>

<script setup lang="ts">
    import { ref, onMounted, watch } from 'vue';
    import { useRoute, useRouter } from 'vue-router';
    import { supabase } from "@/lib/supabase";
    import { generate_uuid_v4 } from '@/lib/generate_uuid';
    import { unproxify } from '@/lib/unproxify';

    import Metadata from "@/components/slides/Metadata.vue";
    import SlideView from "@/components/slides/SlideView.vue";
    import SlideEditor from '@/components/slides/SlideEditor.vue';

    import type { Slide, Element, AnytoAny } from '@/lib/types';
    import { is_text_elem } from '@/lib/detect_tag';

    const props = defineProps({
        language: String
    });
    const route = useRoute();
    const router = useRouter();

    const name = ref('Loading...');
    const width = ref('0');
    const height = ref('0');
    const slides = ref([] as Slide[]);

    const metadata = ref(<AnytoAny>{});
    const loading_done = ref(false);
    const cloud_status = ref(0);
    const team_id = ref(0);

    const is_not_me = ref(false);

    let selected_slide_index = ref(0);

    onMounted(async () => {

        
        const { data: proj_data, error } = await supabase
            .from("Projects")
            .select('*')
            .eq("id", route.params.id);
        
        if (error) router.push('/404');
        if (!proj_data) return;
        const data = proj_data[0];

        if (!data) router.push('/slide/404');
        name.value = data.name;
        width.value = data.content.metadata.width;
        height.value = data.content.metadata.height;
        metadata.value = data.content.metadata;

        slides.value = data.content.data;
        team_id.value = data.team_id;

        loading_done.value = true;
    });

    const new_slide = () => {
        const sid = generate_uuid_v4();
        slides.value.push({id: sid, content:[]} as Slide);
    };

    const select_slide = (index: number) => {
        selected_slide_index.value = index;
    };

    const delete_slide = (id: string) => {
        slides.value = slides.value.filter(slide => slide.id !== id);
    };

    const drag = (x: number, y: number, id: string) => {
        slides.value = slides.value.map(slide => {
            return {
                id: slide.id,
                content: slide.content.map(element => {
                    if (element.id == id) {
                        element.position.x = x;
                        element.position.y = y;
                    }
                    return element;
                })
            };
        });
    };

    const resize = (x: number, y: number, w: number, h: number, id: string) => {
        slides.value = slides.value.map(slide => {
            return {
                id: slide.id,
                content: slide.content.map(element => {
                    if (element.id == id) {
                        element.position.x = x;
                        element.position.y = y;
                        element.position.w = w;
                        element.position.h = h;
                    }
                    return element;
                })
            };
        });
    };

    const rotate = (r: number, id: string) => {
        slides.value = slides.value.map(slide => {
            return {
                id: slide.id,
                content: slide.content.map(element => {
                    if (element.id == id) {
                        element.position.r = r;
                    }
                    return element;
                })
            };
        });
    };

    const content = (content: string, caret_pos: number, id: string) => {
        slides.value = slides.value.map(slide => {
            return {
                id: slide.id,
                content: slide.content.map(element => {
                    if (element.id == id) {
                        element.content = content;
                        
                    }
                    return element;
                })
            };
        });
    };

    const new_elem = (tag: string, id: string) => {
        slides.value = slides.value.map(slide => {
            return {
                id: slide.id,
                content: (slide.id == id) ? [...slide.content, <Element>{
                    id: generate_uuid_v4(),
                    tag: tag,
                    position: {
                        x: 69, y: 420, w: 420, h: 69
                    },
                    content: is_text_elem(tag) ? "Insert text here...." : ''
                }] : slide.content
            };
        });
    };
    
    const styles = () => {
        slides.value = slides.value.map(slide => {
            return {
                id: slide.id,
                content: slide.content.map(element => {
                    let styles = <{[k: string]: any}>(document.getElementById(element.id)?.style) ?? {};
                    styles = Object.fromEntries(Object.entries(<object>styles).filter(([key, value]) => value !== "" && isNaN(parseInt(key))));
                    return {...element, styles: styles};
                })
            };
        });
    };

    const delete_el = (id: string) => {
        slides.value = slides.value.map(slide => {
            return {
                id: slide.id,
                content: slide.content.filter(el => el.id !== id)
            };
        });
    };

    watch(slides, async () => {
        cloud_status.value = 0;
        if (!loading_done.value) return "cope";
        if (is_not_me.value) {
            is_not_me.value = false;
            return;
        }
        console.log("updated server");
        const slug = {
            name: name.value,
            type: "slide",
            content: {
                metadata: unproxify(metadata.value),
                data: unproxify(slides.value)
            }
        };
        await supabase
            .from("Projects")
            .update({
                content: slug.content
            })
            .eq("id", route.params.id)
            .select();
        cloud_status.value = 1;
    });

    const collab_channel = supabase
        .channel('table_db_changes')
        .on(
            'postgres_changes',
            {
                event: '*',
                schema: 'public',
                table: 'Projects',
                filter: `id=eq.${route.params.id}`
            },
            (payload) => {
                is_not_me.value = true;
                slides.value = (<AnytoAny>payload.new).content.data;
                metadata.value = (<AnytoAny>payload.new).content.metadata;
                // console.log(payload);
            }
        )
        .subscribe();

</script>