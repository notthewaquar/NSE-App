import { DataSource } from '@angular/cdk/collections';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { map } from 'rxjs/operators';
import { Observable, of as observableOf, merge } from 'rxjs';
import { PayModel } from '../model/payform.model';

// TODO: Replace this with your own data model type
// export interface DataTableItem {
//   name: string;
//   id: number;
// }

// TODO: replace this with real data from your application
// const EXAMPLE_DATA: DataTableItem[] = [
//   {id: 1, name: 'Hydrogen'},
//   {id: 2, name: 'Helium'},
//   {id: 3, name: 'Lithium'},
//   {id: 4, name: 'Beryllium'},
//   {id: 5, name: 'Boron'},
// ];

/**
 * Data source for the DataTable view. This class should
 * encapsulate all logic for fetching and manipulating the displayed data
 * (including sorting, pagination, and filtering).
 */
export class DataTableDataSource extends DataSource<PayModel> {
  // EXAMPLE_DATA
  data: PayModel[] = [];
  paginator: MatPaginator;
  sort: MatSort;

  constructor() {
    super();
  }

  /**
   * Connect this data source to the table. The table will only update when
   * the returned stream emits new items.
   * @returns A stream of the items to be rendered.
   */
  connect(): Observable<PayModel[]> {
    // Combine everything that affects the rendered data into one update
    // stream for the data-table to consume.
    const dataMutations = [
      observableOf(this.data),
      this.paginator.page,
      this.sort.sortChange
    ];
    console.log(11);
    console.log(this.data);

    return merge(...dataMutations).pipe(map(() => {
      return this.getPagedData(this.getSortedData([...this.data]));
    }));
  }

  /**
   *  Called when the table is being destroyed. Use this function, to clean up
   * any open connections or free any held resources that were set up during connect.
   */
  disconnect() {}

  /**
   * Paginate the data (client-side). If you're using server-side pagination,
   * this would be replaced by requesting the appropriate data from the server.
   */
  private getPagedData(data: PayModel[]) {
    const startIndex = this.paginator.pageIndex * this.paginator.pageSize;
    return data.splice(startIndex, this.paginator.pageSize);
  }

  /**
   * Sort the data (client-side). If you're using server-side sorting,
   * this would be replaced by requesting the appropriate data from the server.
   */
  private getSortedData(data: PayModel[]) {
    if (!this.sort.active || this.sort.direction === '') {
      return data;
    }

    return data.sort((a, b) => {
      const isAsc = this.sort.direction === 'asc';
      switch (this.sort.active) {
        case 'benefName': return compare(a.benefName, b.benefName, isAsc);
        case 'senderName': return compare(a.senderName, b.senderName, isAsc);
        case 'payType': return compare(a.payType, b.payType, isAsc);
        case 'ifscCode': return compare(a.ifscCode, b.ifscCode, isAsc);
        case 'bankName': return compare(a.bankName, b.bankName, isAsc);
        case 'payAmount': return compare(a.payAmount, b.payAmount, isAsc);
        case 'payAmountInWords': return compare(a.payAmountInWords, b.payAmountInWords, isAsc);
        case 'todayDate': return compare(a.todayDate, b.todayDate, isAsc);
        case 'todayTime': return compare(a.todayTime, b.todayTime, isAsc);
        case 'transactionId': return compare(a.transactionId, b.transactionId, isAsc);
        case 'status': return compare(a.status, b.status, isAsc);
        case 'delId': return compare(a.delId, b.delId, isAsc);
        case 'senderMobNo': return compare(+a.senderMobNo, +b.senderMobNo, isAsc);
        case 'accountNumber': return compare(+a.accountNumber, +b.accountNumber, isAsc);
        default: return 0;
      }
    });
  }
  // public getTableData() {
  //   return this.data;
  // }
}

/** Simple sort comparator for example ID/Name columns (for client-side sorting). */
function compare(a: string | number, b: string | number, isAsc: boolean) {
  return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
}
