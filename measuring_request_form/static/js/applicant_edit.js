class Applicant {

    constructor() {
        this.id_employee = null;
        this.nama = null;
        this.dept = null;
        this.email = null;
        this.len = null;
    }

    main() {
        document.addEventListener("DOMContentLoaded", () => {
            const staffApplicant = document.getElementById("staff_name");
            const supervisorApplicant = document.getElementById("spv_name");
            staffApplicant.onchange = (e) => {
                let getId = e.target.value;
                this.renderDeptStaff(getId);
            }

            supervisorApplicant.onchange = (e) => {
                let getId = e.target.value;
                this.renderDeptSpv(getId);
            }
            
            this.getEmployees();
        });
    }

    getEmployees() {
        fetch(`/measuring-request-form/applicantsandrecipients`)
        .then(response => {
            return response.json();
        })
        .then(data => {
            this.id_employee = data.id_employee;
            this.nama = data.nama;
            this.dept = data.dept;
            this.len = data.dept.length;
            this.email = data.email;
            this.renderData();
        })
        .catch(error => {
            alert(error);
        });
    }

    renderData() {
        const staff_name = document.getElementById("staff_name");
        const spv_name = document.getElementById("spv_name");
        const id_employee = this.id_employee;
        const nama = this.nama;
        const email = this.email;
        nama.forEach((name, index) => {
            if(email[index] !== null) {
                staff_name[index+1] = new Option(name, id_employee[index]);
                spv_name[index+1] = new Option(name, id_employee[index]);
            }
        });
    }

    renderDeptStaff(id_emp) {
        let staff_dept_name = document.getElementById("staff_dept_name");
        let id_employee = this.id_employee;
        let dept = this.dept;
        for(let i = 0; i < this.len; i++) {
            if(id_emp == id_employee[i]) {
                staff_dept_name.value = dept[i];
                break;
            }
        }
    }

    renderDeptSpv(id_emp) {
        let spv_dept_name = document.getElementById("spv_dept_name");
        let id_employee = this.id_employee;
        let dept = this.dept;
        for(let i = 0; i < this.len; i++) {
            if(id_emp == id_employee[i]) {
                spv_dept_name.value = dept[i];
                break;
            }
        }
    }
}

const applicant = new Applicant();
applicant.main();