class MeasuringRequest {

    constructor() {
        this.count_notif = 0;
        this.hasNewRequest = false;
    }

    main() {
        document.addEventListener("DOMContentLoaded", () => {
            setInterval(() => {
                this.request_notif();
            }, 5000);
        });
    }

    request_notif() {
        fetch(`/measuring-request/count-notif-request/`)
        .then(response => {
            return response.json();
        })
        .then(data => {
            this.renderInfoNewRequest(data);
        })
        .catch(error => {
            console.log(error);
        });
    }

    renderInfoNewRequest(data) {
        if(data['message'] === "Success") {
            if(this.count_notif !== data['count']) {
                if(this.hasNewRequest) {
                    const new_measuring = document.getElementById("new_measuring");
                    new_measuring.innerText = 'new';
                    new_measuring.className = "badge badge-danger";
                }
                this.hasNewRequest = true;
                this.count_notif = data['count'];
            }
        }
    }
}
const measuring_request = new MeasuringRequest();
measuring_request.main();