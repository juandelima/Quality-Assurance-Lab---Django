class TaskManagement {

    getDataPart(id_customer = "", nama_part = "") {
        const dataPart = () => {
            fetch(`datapart/`)
            .then(response => {
                return response.json();
            })
            .then(data => {
                if(id_customer !== "") {
                    this.renderDataPart(data, id_customer);
                } else {
                    if(nama_part !== "") {
                        this.renderType(data, nama_part);
                    }
                }
            })
            .catch(error => {
                alert(error);
            });
        };
        dataPart();
    }

    getDataMaterial(id_supplier) {
        const dataMaterial = () => {
            fetch(`datamaterial/`)
            .then(response => {
                return response.json();
            })
            .then(data => {
                this.renderDataMaterial(data, id_supplier);
            })
            .catch(error => {
                alert(error);
            });
        }
        dataMaterial();
    }

    main() {
        document.addEventListener("DOMContentLoaded", () => {
            let customer = document.getElementById("inputCustomer");
            let supplier = document.getElementById("inputSupplierModal");
            let selectPart = document.getElementById("inputPart");
            document.getElementById("inputPart").disabled = true;
            customer.onchange = (e) => {
                let id_customer = e.target.value;
                if(id_customer !== "") {
                    document.getElementById("inputPart").disabled = false;
                    this.getDataPart(id_customer);
                } else {
                    selectPart.innerHTML = "";
                    selectPart[0] = new Option("", "", true);
                    document.getElementById("inputPart").disabled = true;
                }
            }

            supplier.onchange = (e) => {
                let id_supplier = e.target.value;
                if(id_supplier !== "") {
                    document.getElementById("inputPart").disabled = false;
                    this.getDataMaterial(id_supplier);
                } else {
                    selectPart.innerHTML = "";
                    selectPart[0] = new Option("", "", true);
                    document.getElementById("inputPart").disabled = true;
                }
            }

            selectPart.onchange = (e) => {
                const type_part = document.getElementById("type_model");
                let nama_part = selectPart.options[selectPart.selectedIndex].text;
                if(nama_part !== "") {
                    this.getDataPart("", nama_part);
                } else {
                    type_part.value = "";
                }
            }
            
        });
    }

    renderDataPart(dataParts, customer_id) {
        const inputPart = document.getElementById("inputPart");
        let id_part = dataParts.id_part;
        let namaPart = dataParts.nama_part;
        let id_customer = dataParts.id_customer;
        inputPart.innerHTML = "";
        inputPart[0] = new Option("", "");
        namaPart.forEach((data, index) => {
            if(customer_id == id_customer[index]) {
                inputPart[index+1] = new Option(data, id_part[index]);
            }
        });
    }

    renderType(dataParts, nama_part) {
        const type_part = document.getElementById("type_model");
        let typePart = dataParts.type_part;
        let lenTypePart = typePart.length;
        let id_customer = dataParts.id_customer;
        let customer = document.getElementById("inputCustomer").value;
        for(let i = 0; i < lenTypePart; i++) {
            if(nama_part.includes(typePart[i]) && customer == id_customer[i]) {
                type_part.value = typePart[i];
                break;
            }
        }
    }

    renderDataMaterial(dataMaterials, id_supplier) {
        const inputPart = document.getElementById("inputPart");
        let code_vendor = dataMaterials.code_vendor;
        let material_name = dataMaterials.material_name;
        inputPart.innerHTML = "";
        inputPart[0] = new Option("", "");
        material_name.forEach((data, index) => {
            if(id_supplier === code_vendor[index]) {
                inputPart[index+1] = new Option(data, code_vendor[index]);
            }
        });
    }
}

const task_management = new TaskManagement();
task_management.main();