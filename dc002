$("body").append('<div class="modal fade" id="donasi" tabindex="-1" role="dialog" aria-labelledby="donasi" aria-hidden="true"><div class="modal-dialog" role="document"><div class="modal-content"><div class="modal-header"><h5 class="modal-title" id="modaltitel">DONASI UNTUK DEVELOPER :)</h5><button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button></div><div class="modal-body">     ...</div><div class="modal-footer"> <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button></div></div></div></div>');
$("body").append('<div class="modal fade" id="loading" tabindex="-1" role="dialog" aria-labelledby="loading" aria-hidden="false"><div class="modal-dialog" role="document"><div class="modal-content"><div class="modal-header"><h5 class="modal-title">SABAR BOSKUE LAGI LOADING...</h5></div><div class="modal-body"><img src="https://media.tenor.com/mp_RBhOXVosAAAAi/%E0%B9%87hahaha-laugh.gif" alt="" srcset=""></div><div class="modal-footer"> </div></div></div></div>');

const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const tgl = urlParams.get('date');
if (!tgl) {
    alert("TENTUKAN TANGGAL TERLEBIH DAHULU !!!");
} else {
    $("#berita_acara-table").dataTable().fnDestroy();
    $(function () {
        $('#berita_acara-table').DataTable({
            processing: true,
            serverSide: true,
            "lengthMenu": [[-1], ["All"]],
            ajax: {
                url: '/getberita_acara',
                data: { "date": tgl, "owner_id": '2110211038184038' }
            },
            columns: [
                { data: 'check_date', name: 'check_date' },
                { data: 'created', name: 'created' },
                { data: 'type', name: 'type' },
                { data: 'code', name: 'code' },
                { data: 'checker_name', name: 'checker_name' },
                { data: 'vehicle_reg_no', name: 'vehicle_reg_no' },
                { data: 'vehicle_code', name: 'vehicle_code' },
                { data: 'driver_name', name: 'driver_name' },
                { data: 'action', name: 'action' },
            ],
            order: [1, 'desc'],
            "initComplete": function () {
                gasken();
                hideloading();
            }

        })
    })
    $('#loading').modal('show');
    console.log('SABAR BOSKUE LAGI LOADING...');

    function hideloading() {
        $('#loading').modal('hide');
    }

    function gasken() {
        setTimeout(() => {
            document.body.innerHTML = document.body.innerHTML.replace(/detail_berita_acara/g, 'download_pdf_ba');
            var items = $('.btn-xs')

            function processItem(index) {
                window.open(items[index].href, '_blank');
                console.log("Processing item:", items[index].href);
                if (index < items.length - 1) {
                    setTimeout(function () {
                        processItem(index + 1);
                    }, delay);
                }
                else {
                    setTimeout(() => {
                        console.log('SELESAI');

                        var t = document.getElementsByTagName('input')[1].value;
                        var date = new Date(t);
                        date.setDate(date.getDate() + 1);

                        var dt = date.getFullYear() + '-' + ('0' + (date.getMonth() + 1)).slice(-2) + '-' + ('0' + date.getDate()).slice(-2);
                        if (confirm('Lanjut ke Tanggal ' + dt + ' ?')) {
                            document.getElementsByTagName('input')[1].value = dt;
                            document.getElementsByTagName('form')[1].submit();
                        } else {
                            $('#donasi').modal('show');
                        }
                    }, 4000);
                }
            }
            processItem(0);
        }, 5000);
    }
}
