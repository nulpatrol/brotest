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
                
                .btn.delete:hover {
                  background: #c64e4d;
                }
                
                .btn.add {
                  background: #f5a214;
                }
                
                .btn.add:hover {
                  background: #f5c24f;
                }
            </style>
            <table class="data-table-wrapper"></table>
        `;

        shadow.appendChild(this.div);
    }
}
