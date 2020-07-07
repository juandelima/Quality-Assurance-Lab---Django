class Applicant {

    constructor() {
        this.id_employee = null;
        this.nama = null;
        this.dept = null;
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
        fetch(`applicantsandrecipients/`)
        .then(response => {
            return response.json();
        })
        .then(data => {
            this.id_employee = data.id_employee;
            this.nama = data.nama;
            this.dept = data.dept;
            this.len = data.dept.length;
            this.renderData();
        })
        .catch(error => {
            alert(error);
        });
    }

    renderData() {
        const staff_name = document.getElementById("staff_name");
        const spv_name = document.getElementById("spv_name");
        let id_employee = this.id_employee;
        let nama = this.nama;
        staff_name.innerHTML = "";
        spv_name.innerHTML = "";
        nama.forEach((name, index) => {
            staff_name[index+1] = new Option(name, id_employee[index]);
            spv_name[index+1] = new Option(name, id_employee[index]);
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