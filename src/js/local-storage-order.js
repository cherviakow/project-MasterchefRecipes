export function saveInLocalStorageModal(objForLocal) {
    try { localStorage.setItem("key_form", JSON.stringify(objForLocal));
    } catch (error) {
        console.log(error);
    };
};

export function returnObjectOfModal() {
    try {
        return JSON.parse(localStorage.getItem("key_form"));
    } catch(error) {
        console.log(error);
    };
};

export function resetLocalStorageModal() {
    try {
        localStorage.removeItem("key_form");
    } catch(error) {
        console.log(error);
    };
};

export function isInLSModalKey() {
    try {
        let info = JSON.parse(localStorage.getItem("key_form"));
    if (info) {
        return true;
    };
    } catch(error) {
        console.log(error);
    };
};
