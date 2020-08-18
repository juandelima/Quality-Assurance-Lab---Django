class TaskManagement {
    main() {
       $(document).ready(() => {
           const save_task_management = document.getElementById("save_task_management");
           this.hide_load_button(); 
           save_task_management.onclick = () => {
               document.getElementsByName("csrfmiddlewaretoken")[0].setAttribute("id", "csrf_new_task");
               const csrfmiddlewaretoken = document.getElementById("csrf_new_task");
               const received_date = document.getElementById("received_date");
               const id_part = document.getElementById("id_part");
               const pic_operator = document.getElementById("pic_operator");
               const inputNote = document.getElementById("inputNote");
               const data = {
                   csrfField: csrfmiddlewaretoken.value,
                   received_dateField: received_date.value,
                   id_partField: id_part.value,
                   pic_operatorField: pic_operator.value,
                   inputNoteField: inputNote.value
               };
               if(data.received_dateField === "" || data.pic_operatorField === "") {
                   alert("Received Date dan Pic Operator tidak boleh kosong!");
               } else {
                   this.save(data);
               }
           };
       });    
    }
    
    save(data) {
       $.ajax({
           type: "POST",
           url: `/task-management/save-task-management/`,
           data: {
               csrfmiddlewaretoken: data.csrfField,
               id_part: data.id_partField,
               id_employee: data.pic_operatorField,
               received_date: data.received_dateField,
               note: data.inputNoteField
           },
           beforeSend: () => {
               this.hide_btn_task();
               this.show_load_button();
           },

           success: (response) => {
                if(response['message'] == 'Success') {
                    setTimeout(() => {
                        $("#create_new_task").modal("hide");
                        this.show_toast();
                        this.show_btn_task();
                        this.hide_load_button(); 
                    }, 1000);
                    
                }
           },

           error: (xhr, status, error) => {
               alert(xhr.responseText);
           },
       });
    }


    show_toast() {
        let x = document.getElementById("toast")
        x.className = "show";
        setTimeout(() => { 
            x.className = x.className.replace("show", ""); 
        }, 5000);
    }

    hide_load_button() {
        return document.getElementById("button__load").style.display = "none";
    }

    show_load_button() {
        return document.getElementById("button__load").style.display = "block";
    }

    hide_btn_task() {
        return document.getElementById("main_btn_save_task_management").style.display = "none";
    }

    show_btn_task() {
        return document.getElementById("main_btn_save_task_management").style.display = "block";
    }
}

const task_management = new TaskManagement();
task_management.main();