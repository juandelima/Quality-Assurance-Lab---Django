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
            const supervisorApplicant = document.getElementById("spv_name");
            supervisorApplicant.onchange = (e) => {
                let getId = e.target.value;
                this.renderDeptSpv(getId);
            }
            
            this.getEmployees();
        });
    }

    getEmployees() {
        fetch(`applicantsandrecipients/`)
        .then(response => {
            return response.json();
        })
        .then(data => {
            this.id_employee = data.id_employee;
            this.nama = data.nama;
            this.dept = data.dept;
            this.email = data.email;
            this.len = data.dept.length;
            this.renderData();
        })
        .catch(error => {
            alert(error);
        });
    }

    renderData() {
        const spv_name = document.getElementById("spv_name");
        const id_employee = this.id_employee;
        const nama = this.nama;
        const email = this.email;
        spv_name.innerHTML = "";
        nama.forEach((name, index) => {
            if(email[index] !== null) {
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