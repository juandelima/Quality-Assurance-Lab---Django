class Recipient {
    main() {
        document.addEventListener("DOMContentLoaded", () => {
            this.getEmployees();
        });
    }

    getEmployees() {
        fetch(`/measuring-request-form/applicantsandrecipients`)
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
        const spv_lab_name = document.getElementById("spv_lab_name");
        let id_employee = data.id_employee;
        let nama = data.nama;
        let dept = data.dept;
        nama.forEach((name, index) => {
            if(dept[index] == "QUALITY ASSURANCE" && name == "KINASTRYAN JITA KRODA") {
                spv_lab_name[index+1] = new Option(name, id_employee[index]);
                return;
            }
        });
    }
}

const recipient = new Recipient();
recipient.main();