class Dashboard {
    main() {
        document.addEventListener("DOMContentLoaded", () => {
            setInterval(() => {
                this.infoNotif() 
            }, 1000);
        });
    }

    infoNotif() {
        fetch(`/cek-notif/`)
        .then(response => {
            return response.json();
        })
        .then(data => {
            this.renderCount(data);
        })
        .catch(error => {
            console.log(error);
        });
    }

    renderCount(data) {
        const new_measuring = document.getElementById("new_measuring");
        const has_fill_task = data['has_fill_task'];
        let cnt = 0;
        has_fill_task.forEach((status, index) => {
            if(status === false) {
                cnt += 1;
            }
        });
        new_measuring.innerText = cnt;
    }
}

const dashboard = new Dashboard();
dashboard.main();