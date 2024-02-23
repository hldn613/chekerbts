
function toLog(l_) {
    return;
}
function toLog2(l_) {
    return;
}

var d1 = document.getElementById('blocking_panel');
    d1.insertAdjacentHTML('afterend', '<style> .limark {list-style:none;} #box1, #box2{overflow: auto; max-height: 432px;}   #data_unit {        font-family: Arial, Helvetica, sans-serif;        border-collapse: collapse;        width: 100%;    }    #data_unit td,    #data_unit th {        border: 1px solid #ddd;        padding: 8px;    }    #data_unit tr:nth-child(even) {        background-color: #f2f2f2;    }    #data_unit tr:hover {        background-color: #ddd;    }    #data_unit th {        padding-top: 12px;        padding-bottom: 12px;        text-align: left;        background-color: #04AA6D;        color: white;    }</style><button id="opener">open the dialog</button><div id="dialog_troble" title="hldn">    <div class="row3">        <div class="title-block">Report</div>        <div class="report-block block width50">            <div id="box1" class="container">                <table id="data_unit">                    <thead id="t_head">                        <tr>                            <th>NO LAMBUNG</th>                            <th>ACC</th>                            <th>UPDATE</th>                            <th>TELF</th>                        </tr>                    </thead>                    <tbody id="t_body">                        <tr>                            <td>waiting...</td>                            <td>waiting...</td>                            <td>waiting...</td>                            <td>waiting...</td>                        </tr>                    </tbody>                </table>            </div>        </div>        <div class="report-block block width50">            <div id="box2" class="container">            </div>        </div>    </div></div>');

    $("#dialog_troble").dialog({
        autoOpen: false,
        maxWidth: 780,
        maxHeight: 580,
        width: 780,
        height: 580,
        resizable: false,
        buttons: 
            [
                
                {
                    text:'star',
                    id: "okbtnid",
                    click: function() {
                        alert("star");
                        $(this).dialog(delayedLoop());                        
                    }                   
                },
                {
                    text:'CANCEL',
                    class:'red',
                    click: function() {
                        $(this).dialog("close");
                    }                   
                }
            ],
        
        close: function() {}
    });
    $("#opener").click(function() {
        $("#dialog_troble").dialog("open");
    });

var delay = 1700; // delay looping nya (satuan detik)
    var less_than = 2; // waktu update kurang dari (satuan jam)

    //hasil akhir
    var acc = 0;
    var t_posision_j = 0;
    // var t_serv_j = 0;
    var unitData = [];
    unitData.splice(unitData.length, 0, ["NO LAMBUNG", "ACC", "UPDATE", "TELF"]);

    //waktu sekarang
    const dt = new Date();
    dt.setHours(dt.getHours() - less_than);
    const padL = (nr, len = 2, chr = `0`,) => `${nr}`.padStart(2, chr);
    var tmn = (`${dt.getFullYear()}-${padL(dt.getMonth() + 1)}-${padL(dt.getDate())} ${padL(dt.getHours())}:${padL(dt.getMinutes())}:${padL(dt.getSeconds())}`);


    function processItem(index) {

        // Perform some task with the current item
        document.getElementById(items[index]).click();
        setTimeout(() => {
            var nl = document.getElementById(items[index]).cells[5].textContent;
            var x = document.getElementById("left_panel_objects_object_data_list_grid").rows[10].cells[1].innerHTML;
            var t_posision = document.getElementById("left_panel_objects_object_data_list_grid").rows[8].cells[1].innerHTML;
            var telf = document.getElementById("left_panel_objects_object_data_list_grid").rows[7].cells[1].innerHTML;
            var t_serv = document.getElementById("left_panel_objects_object_data_list_grid").rows[9].cells[1].innerHTML;
            var box2 = document.getElementById("box2");

            function updateScreen() {

                function getCells(unitData, type) {
                    return unitData.map(cell => `<${type}>${cell}</${type}>`).join('');
                }

                function createBody(unitData) {
                    return unitData.map(row => `<tr>${getCells(row, 'td')}</tr>`).join('');
                }

                function createTable(unitData) {

                    // Destructure the headings (first row) from
                    // all the rows
                    const [headings, ...rows] = unitData;

                    // Return some HTML that uses `getCells` to create
                    // some headings, but also to create the rows
                    // in the tbody.
                    return `
                <table id='data_unit'>
                  <thead id='t_head'>${getCells(headings, 'th')}</thead>
                  <tbody id='t_body'>${createBody(rows)}</tbody>
                </table>
              `;
                }

                // Bang it altogether
                var d1 = document.getElementById('box1');
                d1.insertAdjacentHTML('afterbegin', createTable(unitData));
            }

            function diff_hours(dt, dt1) {
                var diff = (dt.getTime() - dt1.getTime()) / 1000;
                diff /= (60 * 60);
                return Math.abs(Math.round(diff));
            }

            dt1 = new Date(t_posision);
            dt2 = new Date();



            
// Create an "li" node:
const node = document.createElement("li");
node.className = "limark";


// Create a text node:
const textnode = document.createTextNode(nl.slice(0, -19) + "\nacc = " + x + "\nUPDATE :" + diff_hours(dt1, dt2) + " jam x");

// Append the text node to the "li" node:
node.appendChild(textnode);

// Append the "li" node to the list:
box2.appendChild(node);

box2.scrollTop = box2.scrollHeight;
            console.log("_______________________")
            if (x == 0 || new Date(t_posision) <= new Date(tmn)) {
                const eth = document.getElementById("data_unit");
                node.className = "limark ui-state-error";
                eth.remove();
                acc += 1;
                unitData.splice(unitData.length, 0, [nl.slice(0, -19), x, diff_hours(dt1, dt2) + " jam", "<a href='tel:" + telf + "'>" + telf + "</a>"]);
                console.log(nl.slice(0, -19) + "\nacc = " + x + "\nUPDATE :" + diff_hours(dt1, dt2) + " jam");
                updateScreen();
                


            } else {
                console.log(nl.slice(0, -19) + "\nacc = " + x + "\nUPDATE :" + diff_hours(dt1, dt2) + " jam")
            }


            if (index == items.length - 1) {
                console.log(
                    "ACC 0 = " + acc +
                    "\nNO UPDATE POSISION =" + t_posision_j
                );
                console.table(unitData);
                // display
                // updateScreen();
                document.getElementById("okbtnid").disabled = false;
            }
            else{
                document.getElementById("okbtnid").disabled = true;
            }

        }, 500);

        if (index < items.length - 1) {
            setTimeout(function () {
                processItem(index + 1);
            }, delay);
        }

    }

    // Start the loop with the first item
    processItem(0);
}





// img / connection_gsm_gps.png
// img / connection_no.png
