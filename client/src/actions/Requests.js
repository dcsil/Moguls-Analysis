export const getAllDate = () => {
    const request = new Request("/getAllDate", {
        method: "GET",
        body: JSON.stringify(data),
        headers: {
            Accept: "application/json, text/plain, */*",
            "Content-Type": "application/json"
        }
    });

    // Send the request with fetch()
    fetch(request)
        .then(res => {
            if (res.status === 200) {
                console.log(res.json());    // for dev and debug
                return res.json();
            } else {
                alert("Sorry, fail to get all records, please try again");
            }
        }).catch((error) => {
            console.log("ERROR: "  + error)
        })
}


export const saveData = data => {
    const request = new Request("/addData", {
        method: "POST",
        body: JSON.stringify(data),
        headers: {
            Accept: "text/plain",
            "Content-Type": "application/json"
        }
    });

    // Send the request with fetch()
    fetch(request)
        .then(res => {
            if (res.status === 200) {
                console.log(res.text());    // for dev and debug
                return res.text();
            } else {
                alert("Sorry, save failed, please try again");
            }
        }).catch((error) => {
            console.log("ERROR: "  + error)
        })
};