$(document).ready(function () {
    $('#dataTable').DataTable(); // ID From dataTable

      $('.select2-single-placeholder').select2({
        placeholder: "Select a Customer",
        allowClear: true,
        width: '100%'
      });

      $('.select2-single-placeholder8').select2({
        placeholder: "Select a Supplier",
        allowClear: true,
        width: '100%'
      });

      $('.select2-single-placeholder2').select2({
        placeholder: "Select a Part",
        allowClear: true,
        width: '100%'
      });

      $('.select2-single-placeholder3').select2({
        placeholder: "Select a Type",
        allowClear: true,
        width: '100%'
      });

      $('.select2-single-placeholder4').select2({
        placeholder: "Select a User",
        allowClear: true,
        width: '100%'
      });

      $('.select2-single-placeholder5').select2({
        placeholder: "Select a Measurement",
        allowClear: true,
        width: '100%'
      });

      $('.select2-single-placeholder6').select2({
        placeholder: "Select a Standart Tolerance",
        allowClear: true,
        width: '100%'
      });

      $('.select2-single-placeholder7').select2({
        placeholder: "Select a Common Type",
        allowClear: true,
        width: '100%'
      });

      $('.select2-single-placeholder9').select2({
        placeholder: "Select a Type Form",
        allowClear: true,
        width: '100%'
      });

      $('.select2-single-placeholder10').select2({
        placeholder: "Select a Customer",
        allowClear: true,
        width: '100%'
      });

      $('.select2-single-placeholder11').select2({
        placeholder: "Select a Shift",
        allowClear: true,
        width: '100%'
      });

      $('.select2-single-placeholder12').select2({
        placeholder: "Search your name",
        allowClear: true,
      });

      $('.select2-single-placeholder13').select2({
        placeholder: "Search Email",
        allowClear: true,
        width: '100%'
      });

      $('#simple-date3 .input-group-sm.date').datepicker({
        format: 'dd/mm/yyyy',
        todayBtn: 'linked',
        todayHighlight: true,
        autoclose: true        
      });
});