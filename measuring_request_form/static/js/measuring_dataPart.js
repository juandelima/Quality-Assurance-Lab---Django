class DataPart {

    main() {
        $(document).ready(() => {
            let searchPart = $("#search_part");
            searchPart.click((e) => {
                $("#modalDataParts").modal("show");
                this.showSkeletonLoading();
                this.hideMainTable();
                setTimeout(() => {
                    this.getDataPart();
                }, 2000);
                
            });
        });
    }

    getDataPart() {
        fetch(`measuringdatapart/`)
        .then(response => {
            return response.json();
        })
        .then(data => {
            this.renderData(data);
            this.showSkeletonLoading();
            setTimeout(() => {
                this.hideSkeletonLoading();
                this.showMainTable();
            }, 3000);
        })
        .catch(error => {
            alert(error);
        });
    }

    renderData(data) {
        $(document).ready(() => {
            let dataParts = $("#dataParts").DataTable();
            dataParts.clear().draw();
            let id_part = data.id_part;
            let no_sap = data.no_sap;
            let nama_part = data.nama_part;
            let proses = data.proses;
            let type_part = data.type_part;
            let customer = data.customer;
            let index = 0;
            let button_select;
            nama_part.forEach(part => {
                button_select = `
                <a href="#" id="${id_part[index]}" class="btn btn-sm btn-primary btn-icon-split">
                    <span class="icon text-white-50">
                    <i class="fas fa-check"></i>
                    </span>
                    <span class="text">Pilih</span>
                </a>`;
                dataParts.row.add([
                    index+1,
                    no_sap[index],
                    part,
                    type_part[index],
                    proses[index],
                    customer[index],
                    button_select
                ]).draw(false)
                index += 1;
            });
        });
    }

    showMainTable() {
        return document.getElementById("main-table").style.display = "block"; 
    }

    hideMainTable() {
        return document.getElementById("main-table").style.display = "none"; 
    }

    showSkeletonLoading() {
        return document.getElementById("skeleton-loading").style.display = "block";
    }

    hideSkeletonLoading() {
        return document.getElementById("skeleton-loading").style.display = "none";
    }
    
}

const dataPart = new DataPart();
dataPart.main();