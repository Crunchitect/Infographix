export const generate_uuid_v4 = () => {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, char => {
        let rand = Math.random() * 16 | 0;
        switch (char) {
            case 'x':
                break;
            case 'y':
                rand &= 3;
                rand |= 8;
                break;
        }
        return rand.toString(16);
    });
};