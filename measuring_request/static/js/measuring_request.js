class MeasuringRequest {

    constructor() {
        this.count_notif = 0;
    }

    main() {
        $(document).ready(() => {
            this.cek_count();
            this.render_data_measuring_request();
            setInterval(() => {
                this.request_notif();
            }, 5000);
        });
    }


    cek_count() {
        fetch(`/measuring-request/count-notif-request/`)
        .then(response => {
            return response.json();
        })
        .then(data => {
            this.count_notif = data['count'];
        })
        .catch(error => {
            console.log(error);
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

    render_data_measuring_request() {
        $('#data-request-form').DataTable({
            ajax: {
                "url": "/measuring-request/data-measuring-requests/",
                "type": "GET",
            },
            destroy: true,
            processing: true,
            deferRender: true,
            aaSorting: [ [0,'desc'] ],
            columns: [
                {
                    data: 'id_request'
                },
                {
                    data: 'part_name'
                },
                {
                    data: 'qty_cavity'
                },
                {
                    data: 'qty_part'
                },
                {
                    data: 'receiving_date'
                },
                {
                    data: 'receiving_time'
                },
                {
                    data: 'testing_start'
                },
                {
                    data: 'testing_end'
                }
            ]
        });
    }

    renderInfoNewRequest(data) {
        if(data['message'] === "Success") {
            if(this.count_notif !== data['count']) {
                if(data['count'] > 0) {
                    const new_measuring = document.getElementById("new_measuring_nav");
                    new_measuring.innerText = 'new';
                    new_measuring.className = "badge badge-danger";
                }
                this.count_notif = data['count'];
            }
        }
    }


}
const measuring_request = new MeasuringRequest();
measuring_request.main();