class Notifications {
    constructor() {
        this.notifications_info = document.getElementById("notifications-info");
        this.no_notif = document.getElementById("no_notif");
        this.count_notif = 0;
        this.hasClicked = false;
        this.hasNewRecord = false;
    }

    main() {
        document.addEventListener("DOMContentLoaded", () => {
            const alertsDropdown = document.getElementById("alertsDropdown");
            alertsDropdown.onclick = (e) => {
                if(this.hasNewRecord) {
                    this.notifications_info.innerHTML = '';
                    this.haveNotif();
                    this.showSkeletonNotif();
                    this.hasNewRecord = false;
                }
                this.infoNotif();
                this.hasClicked = true;
            };
            setInterval(() => {
                this.countNotif() 
            }, 1000);
        });
    }


    countNotif() {
        fetch(`/count-notif/`)
        .then(response => {
            return response.json();
        })
        .then(data => {
            this.renderCountData(data);
        })
        .catch(error => {
            alert(error);
        });
    }

    infoNotif() {
        fetch(`/info-notif/`)
        .then(response => {
            return response.json();
        })
        .then(data => {
            setTimeout(() => {
                this.hideSkeletonNotif();
                this.renderDataInfoNotif(data);
            }, 1000);
        })
        .catch(error => {
            alert(error);
        });
    }

    renderCountData(data) {
        let counting;
        const count_notif_el = document.getElementById("count_notif");
        if(data['message'] == "Success") {
            if(data['count_notif'] >= 1) {
                if(data['count_notif'] > 3) {
                    counting = `3+`;
                } else {
                    counting = data['count_notif']
                }
                count_notif_el.innerText = counting;
            } else {
                count_notif_el.innerText = '';
            }

            if(this.count_notif !== data['count_notif']) {
                if(this.hasClicked) {
                    if(data['count_notif'] > 0) {
                        this.hasNewRecord = true;
                    }
                    this.notifications_info.innerHTML = '';
                    this.showSkeletonNotif();
                    this.infoNotif();
                    this.haveNotif();
                    this.hasClicked = false;
                }
                this.count_notif = data['count_notif'];
            }
        }
    }

    renderDataInfoNotif(data) {
        let created_at = data['created_at'];
        let info_notif = data['info_notif'];
        let count = 0;
        this.notifications_info.innerHTML = '';
        info_notif.forEach((info, index) => {
            if(index <= 2) {
                this.notifications_info.innerHTML += `
                    <a class="dropdown-item d-flex align-items-center" href="#">
                        <div class="mr-3">
                        <div class="icon-circle bg-primary">
                            <i class="fas fa-file-alt text-white"></i>
                        </div>
                        </div>
                        <div>
                        <div class="small text-gray-500">${created_at[index]}</div>
                        <span class="font-weight-bold">
                            ${info}
                        </span>
                        </div>
                    </a>
                `;
            }
            count += 1;
        });

        this.notifications_info.innerHTML += `
            <a class="dropdown-item text-center small text-gray-500" href="#" id="show_all_nofif">Show All Notifications</a>
        `;

        if(count > 0) {
            this.haveNotif();
        } else {
            this.noNotif();
        }
    }

    hideSkeletonNotif() {
        return document.getElementById("skeleton_notif").style.display = "none";
    }

    showSkeletonNotif() {
        return document.getElementById("skeleton_notif").style.display = "block";
    }

    noNotif() {
        return this.no_notif.style.display = "block";
    }

    haveNotif() {
        return this.no_notif.style.display = "none";
    }
}

const notif = new Notifications();
notif.main();