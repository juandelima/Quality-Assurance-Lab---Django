class DataPart {

    constructor() {
        this.hasClickedSearchPart = true
        this.hasClickedSearchMaterial = true
    }
    
    main() {
        $(document).ready(() => {
            const searchPart = $("#search_part");
            const searchMaterial = $("#search_material");
            searchPart.click(() => {
                $("#modalDataParts").modal("show");
                if(this.hasClickedSearchPart) {
                    this.hideMainTable();
                    this.showSkeletonLoading();
                    this.getDataPart();
                    this.hasClickedSearchPart = false;
                }
            });

            searchMaterial.click(() => {
                $("#modalMaterial").modal("show");
                if(this.hasClickedSearchMaterial) {
                    this.hideMainTableMaterials();
                    this.showSkeletonLoading2();
                    this.getMaterials();
                    this.hasClickedSearchMaterial = false
                }
            });
        });
    }

    getDataPart() {
        fetch(`measuringdatapart/`)
        .then(response => {
            return response.json();
        })
        .then(data => {
            this.showSkeletonLoading();
            setTimeout(() => {
                this.renderData(data);
                this.hideSkeletonLoading();
                this.showMainTable();
            }, 2000);
        })
        .catch(error => {
            alert(error);
        });
    }

    getMaterials() {
        fetch(`measuringdatamaterial/`)
        .then(response => {
            return response.json();
        })
        .then(data => {
            this.showSkeletonLoading2();
            setTimeout(() => {
                this.renderDataMaterial(data);
                this.hideSkeletonLoading2();
                this.showMainTableMaterials();
            }, 2000);
        })
        .catch(error => {
            alert(error);
        });
    }

    renderData(data) {
        $(document).ready(() => {
            let id_part = data.id_part;
            let no_sap = data.no_sap;
            let nama_part = data.nama_part;
            let type_part = data.type_part;
            let customer = data.customer;
            let index = 0;
            let group_part_by_id = {};
            nama_part.forEach(part => {
                let part_by_id = [];
                part_by_id.push(id_part[index]);
                part_by_id.push(no_sap[index]);
                part_by_id.push(part);
                part_by_id.push(type_part[index]);
                part_by_id.push(customer[index]);
                group_part_by_id[id_part[index]] = part_by_id;
                index += 1;
            });

            $("#dataParts tbody").on('click', '.btn-pilih', function() {
                let getId = $(this).attr('id');
                let data_parts = group_part_by_id[getId];
                document.getElementById("id_part").value = data_parts[0];
                document.getElementById("part_no").value = data_parts[1];
                document.getElementById("part_name").value = data_parts[2];
                document.getElementById("type").value = data_parts[3];
                document.getElementById("customer").value = data_parts[4];
            });
        });
    }

    renderDataMaterial(datamaterial) {
        $(document).ready(() => {
            let material_code = datamaterial.material_code;
            let material_name = datamaterial.material_name;
            let vendor = datamaterial.vendor;
            let index = 0;
            let group_by_material_code = {};
            material_name.forEach(material => {
                let material_by_code = [];
                material_by_code.push(material_code[index]);
                material_by_code.push(material);
                material_by_code.push(vendor[index]);
                group_by_material_code[material_code[index]] = material_by_code;
                index += 1;
            });

            $("#dataMaterials tbody").on('click', '.btn-pilih-material', function() {
                let getId = $(this).attr('id');
                let data_material = group_by_material_code[getId];
                document.getElementById("part_no").value = data_material[0];
                document.getElementById("part_name").value = data_material[1];
                document.getElementById("supplier").value = data_material[2];
            });
        });
    }

    showMainTable() {
        return document.getElementsByClassName("main-table")[0].style.display = "block";
    }

    hideMainTable() {
        return document.getElementsByClassName("main-table")[0].style.display = "none"; 
    }

    showMainTableMaterials() {
        return document.getElementsByClassName("main-table-materials")[0].style.display = "block";
    }

    hideMainTableMaterials() {
        return document.getElementsByClassName("main-table-materials")[0].style.display = "none"; 
    }

    showSkeletonLoading() {
        return document.getElementsByClassName("skeleton-loading")[0].style.display = "block";
    }

    hideSkeletonLoading() {
        return document.getElementsByClassName("skeleton-loading")[0].style.display = "none";
    }

    showSkeletonLoading2() {
        return document.getElementsByClassName("skeleton-loading-2")[0].style.display = "block";
    }

    hideSkeletonLoading2() {
        return document.getElementsByClassName("skeleton-loading-2")[0].style.display = "none";
    }
    
}

const dataPart = new DataPart();
dataPart.main();