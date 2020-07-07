class Recipient {
    main() {
        document.addEventListener("DOMContentLoaded", () => {
            this.getEmployees();
        });
    }

    getEmployees() {
        fetch(`applicantsandrecipients/`)
        .then(response => {
            return response.json();
        })
        .then(data => {
            this.renderData(data);
        })
        .catch(error => {
            alert(error);
        });
    }

    renderData(data) {
        const staff_lab_name = document.getElementById("staff_lab_name");
        const spv_lab_name = document.getElementById("spv_lab_name");
        let id_employee = data.id_employee;
        let nama = data.nama;
        let dept = data.dept;
        staff_lab_name.innerHTML = "";
        spv_lab_name.innerHTML = "";
        nama.forEach((name, index) => {
            if(dept[index] == "QUALITY ASSURANCE") {
                staff_lab_name[index+1] = new Option(name, id_employee[index]);
                spv_lab_name[index+1] = new Option(name, id_employee[index]);
            }
        });
    }
}

const recipient = new Recipient();
recipient.main();