export default class DataTable extends HTMLElement {
    constructor() {
        super();
        const shadow = this.attachShadow({mode: 'open'});

        this.div = document.createElement('div');

        this.startRowCount = parseInt(this.getAttribute('row-count')) || 1;
        this.startColumnCount = parseInt(this.getAttribute('column-count')) || 1;
        this.cellWidth = 50;

        this.rowCount = 0;
        this.columnCount = this.startColumnCount;

        this.div.innerHTML = `
            <style>
               .main {
                  display: flex;
                }
                
                .left-col {
                  padding-right: 2px;
                  padding-top: 4px;
                  position: relative;
                }
                
                .right-col {
                  padding-top: 4px;
                  padding-left: 2px;
                }
                
                .table-footer {
                  padding-left: 54px;
                  padding-top: 2px;
                }
                
                .table-head {
                  padding-left: 56px;
                  padding-bottom: 2px;
                  position: relative;
                }
                
                .animated .btn {
                  -webkit-transition: 0.5s ease-out;
                  transition: 0.5s ease-out;
                }
                
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
                
                .btn.delete:hover {
                  background: #c64e4d;
                }
                
                .btn.add {
                  background: #f5a214;
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
            <div class="table-wrapper">
                <div class="table-head">
                    <button class="btn delete column"><span>-</span></button>
                </div>
            
                <div class="main">
                    <div class="left-col">
                        <button class="btn delete row"><span>-</span></button>
                    </div>
                    <table class="table"></table>
                    <div class="right-col">
                        <button class="btn add column"><span>+</span></button>
                    </div>
                </div>
                <div class="table-footer">
                    <button class="btn add row"><span>+</span></button>
                </div>
            </div>
        `;

        shadow.appendChild(this.div);
        this.div.querySelector('.btn.delete.row').style.visibility = 'hidden';
        this.div.querySelector('.btn.delete.column').style.visibility = 'hidden';

        for (let i = 0; i < this.startRowCount; i += 1) {
            this.addRow(this);
        }
    }

    mouseEnterCallback(e, context) {
        context.activeColumn = e.target.cellIndex;
        context.activeRow = e.target.parentNode.rowIndex;

        context.div.querySelector('.btn.delete.column').style.transform =
            `translateX(${context.activeColumn * (this.cellWidth + 4)}px)`;
        context.div.querySelector('.btn.delete.row').style.transform =
            `translateY(${context.activeRow * (this.cellWidth + 4)}px)`;

        if (this.columnCount > 1) {
            context.div.querySelector('.btn.delete.column').style.visibility = 'visible';
        }

        if (this.rowCount > 1) {
            context.div.querySelector('.btn.delete.row').style.visibility = 'visible';
        }
    }

    addRow(context) {
        let row = context.div.querySelector('.table').insertRow(-1);
        for (let i = 0; i < context.columnCount; i += 1) {
            let cell = row.insertCell(-1);
            cell.innerHTML = `[${context.rowCount}, ${i}]`;
            cell.addEventListener('mouseenter', (e) => { context.mouseEnterCallback(e, context) });
        }
        context.rowCount += 1;
    }

    addColumn(context) {
        let rows = [].slice.call(context.div.querySelectorAll('.table tr'));
        for (let i = 0; i < rows.length; i += 1) {
            let cell = rows[i].insertCell(-1);
            cell.innerHTML = `[${i}, ${context.columnCount}]`;
            cell.addEventListener('mouseenter', (e) => { context.mouseEnterCallback(e, context) });
        }
        this.columnCount += 1;
    }

    connectedCallback() {
        this.div.querySelector('.table').addEventListener('mouseleave', (e) => {
            this.div.querySelector('.data-table-wrapper').classList.remove('animated');
        });

        this.div.querySelector('.table').addEventListener('mouseenter', (e) => {
            this.div.querySelector('.data-table-wrapper').classList.add('animated');
        });

        this.div.querySelector('.data-table-wrapper').addEventListener('mouseleave', () => {
            this.div.querySelector('#remove-row-btn').style.visibility = 'hidden';
            this.div.querySelector('#remove-column-btn').style.visibility = 'hidden';
        });

        this.div.querySelector('#add-row-btn').addEventListener('click', () => {
            this.addRow(this);
        });

        this.div.querySelector('#add-column-btn').addEventListener('click', () => {
            this.addColumn(this);
        });

        this.div.querySelector('#remove-column-btn').addEventListener('click', (e) => {
            let rows = [].slice.call(this.div.querySelectorAll('.table tr'));
            for (let i = 0; i < rows.length; i += 1) {
                rows[i].deleteCell(this.activeColumn);
            }
            this.columnCount -= 1;
            e.currentTarget.style.visibility = 'hidden';
        });

        this.div.querySelector('#remove-row-btn').addEventListener('click', (e) => {
            let table = this.div.querySelector('.table');
            table.deleteRow(this.activeRow);
            this.rowCount -= 1;
            e.currentTarget.style.visibility = 'hidden';
        });
    }
}
