export default class DataTable extends HTMLElement {
    constructor() {
        super();
        const shadow = this.attachShadow({mode: 'open'});

        this.div = document.createElement('div');
        this.rowCount = 4;
        this.columnCount = 4;

        this.div.innerHTML = `
            <style>
                .btn {
                  width: 50px;
                  height: 50px;
                  border: none;
                  color: #fff;
                  -webkit-transition: background-color 1s ease-out;
                  transition: background-color 1s ease-out;
                }
                
                .btn span {
                  font-size: 20px;
                  line-height: 1;
                }
                
                .btn.delete {
                  background: #b00000;
                }
                
                .btn.delete.row {
                  margin-top: 3px;
                  margin-right: -2px;
                }
                
                .btn.delete.column {
                  margin-bottom: -2px;
                  margin-left: 3px;
                }
                
                .btn.delete:hover {
                  background: #c64e4d;
                }
                
                .btn.add {
                  background: #f5a214;
                }
                
                .btn.add.row {
                  margin-left: 3px;
                  margin-top: -2px;
                }
                
                .btn.add.column {
                  margin-left: -2px;
                  margin-top: 3px;
                }
                
                .btn.add:hover {
                  background: #f5c24f;
                }
                
                .table {
                  border: 1px #4cabe3 solid;
                  text-align: center;
                }
                
                .table td {
                  background-color: #4cabe3;
                  width: 50px;
                  height: 50px;
                  color: white;
                  font-size: 12px;
                }
                
                .btn-cell {
                  vertical-align: top;
                }
            </style>
            <table class="data-table-wrapper">
                <tr>
                    <td></td>
                    <td class="btn-cell"><button id="remove-column-btn" class="btn delete column"><span>-</span></button></td>
                    <td></td>
                </tr>
                <tr>
                    <td class="btn-cell"><button id="remove-row-btn" class="btn delete row"><span>-</span></button></td>
                    <td>
                        <table class="table">
                            <tr>
                                <td>[0, 0]</td>
                            </tr>
                        </table>
                    </td>
                    <td class="btn-cell"><button id="add-column-btn" class="btn add column"><span>+</span></button></td>
                </tr>
                <tr>
                    <td></td>
                    <td class="btn-cell"><button id="add-row-btn" class="btn add row"><span>+</span></button></td>
                    <td></td>
                </tr>
            </table>
        `;

        shadow.appendChild(this.div);
    }

    mouseEnterCallback(e, context) {
        context.activeColumn = e.target.cellIndex;
        context.activeRow = e.target.parentNode.rowIndex;

        context.div.querySelector('.btn.delete.column').style.transform =
            `translateX(${context.activeColumn * (50 + 4)}px)`;
        context.div.querySelector('.btn.delete.row').style.transform =
            `translateY(${context.activeRow * (50 + 4)}px)`;
    }

    connectedCallback() {
        let cells = [].slice.call(this.div.querySelectorAll('.table td'));

        cells.forEach((cell) => {
            cell.addEventListener('mouseenter', (e) => { this.mouseEnterCallback(e, this) });
        });
    }
}
