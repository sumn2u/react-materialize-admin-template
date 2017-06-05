import React from 'react';
import {Link} from 'react-router';
import {Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn} from 'material-ui/Table';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import ContentCreate from 'material-ui/svg-icons/content/create';
import ContentAdd from 'material-ui/svg-icons/content/add';
import {pink500, grey200, grey500, white, blue500} from 'material-ui/styles/colors';
import PageBase from '../components/PageBase';
import TextField from 'material-ui/TextField';
import Data from '../data';
import map from 'lodash/map';
import ReactPaginate from 'react-paginate';

class PaginationTablePage extends React.PureComponent {
   constructor(props) {
    super(props);
    this.state = {
      currentPage:0,
      pageCount:0,
      offers :{},
      filterOffers: {}
    }

    this.getPagination = this.getPagination.bind(this);
   }

  componentDidMount() {
    this.getPagination(Data.tablePage.items);
  }

   handlePageClick = (data) => {
    let selected = data.selected;
    this.setState({currentPage:selected});
  }
  
   getPagination(data){
       let _this = this;
       let keys = Object.keys(data); // Notice the .sort()!
        let pageLength = 5;
        let pageCount = Math.ceil(keys.length / pageLength);
        let currentPage = 1;
        let pages = [];
        let nextKey;
        let query;
        this.setState({pageCount:pageCount});
        for (let i = 0; i < pageCount; i++) {
         let key = keys[i * pageLength];
            if(data.length >=1) {
                query = data.slice(key, (i+1)*pageLength);
                pages.push(query);
            }
        }
    
        _this.setState({offers: pages, loading: false, filterOffers: pages});
       
  }

  filterList(event) {
    let obj = Data.tablePage.items;
    let filteredArray = [];
    let filterObjects = [];
    Object.keys(obj).forEach(function (key) {
      filteredArray.push(obj[key]);
    });
    
    filteredArray = filteredArray.filter((item) => {
      return item.name.toLowerCase().search(event.target.value.toLowerCase()) !== -1;

    });
    this.getPagination(filteredArray);
    
  }
 render() {
  let {filterOffers,offers, isFirstPage, isLastPage, currentPage} = this.state;
   let currentData = {};
    let currentUsers = [];
    for (let i = 0; i < filterOffers.length; i++) {
      if(currentPage == i){
         currentData = filterOffers[i];
      }
    
    }
  const styles = {
      
      searchStyles: {
        iconButton: {
          float: 'left',
          paddingTop: 17
        },
        textField: {
          color: white,
          backgroundColor: blue500,
          borderRadius: 2,
          height: 35
        },
        inputStyle: {
          color: white,
          paddingLeft: 5
        },
        hintStyle: {
          height: 16,
          paddingLeft: 5,
          color: white
        }
      },
    floatingActionButton: {
      margin: 0,
      top: 'auto',
      right: 20,
      bottom: 20,
      left: 'auto',
      position: 'fixed',
    },
    editButton: {
      fill: grey500
    },
    columns: {
      id: {
        width: '10%'
      },
      name: {
        width: '40%'
      },
      price: {
        width: '20%'
      },
      category: {
        width: '20%'
      },
      edit: {
        width: '10%'
      }
    }
  };

  return (
    
    <PageBase title="Data Table Page"
              navigation="Application / Data Table"
             >

        <div className="tableElm" >
          <TextField
            onChange={this.filterList.bind(this)}
            hintText={"Search ..."}
            underlineShow={false}
            fullWidth={false}
          />
        <div className="commentBox" id="react-paginate">
            <ReactPaginate previousLabel={"previous"}
                       nextLabel={"next"}
                       breakLabel={<a href="">...</a>}
                       breakClassName={"break-me"}
                       pageCount={this.state.pageCount}
                       marginPagesDisplayed={2}
                       pageRangeDisplayed={3}
                       onPageChange={this.handlePageClick}
                       containerClassName={"pagination"}
                       subContainerClassName={"pages pagination"}
                       activeClassName={"active"} />
        </div>
       </div>
       
       
        <Table  className="tableBox">
          <TableHeader>
            <TableRow>
              <TableHeaderColumn style={styles.columns.id}>ID</TableHeaderColumn>
              <TableHeaderColumn style={styles.columns.name}>Name</TableHeaderColumn>
              <TableHeaderColumn style={styles.columns.price}>Price</TableHeaderColumn>
              <TableHeaderColumn style={styles.columns.category}>Category</TableHeaderColumn>
              <TableHeaderColumn style={styles.columns.edit}>Edit</TableHeaderColumn>
            </TableRow>
          </TableHeader>
          <TableBody>
            {map(currentData, item =>
              <TableRow key={item.id}>
                <TableRowColumn style={styles.columns.id}>{item.id}</TableRowColumn>
                <TableRowColumn style={styles.columns.name}>{item.name}</TableRowColumn>
                <TableRowColumn style={styles.columns.price}>{item.price}</TableRowColumn>
                <TableRowColumn style={styles.columns.category}>{item.category}</TableRowColumn>
                <TableRowColumn style={styles.columns.edit}>
                  <Link className="button" to="/form">
                    <FloatingActionButton zDepth={0}
                                          mini={true}
                                          backgroundColor={grey200}
                                          iconStyle={styles.editButton}>
                      <ContentCreate  />
                    </FloatingActionButton>
                  </Link>
                </TableRowColumn>
              </TableRow>
            )}
          </TableBody>
        </Table>
    </PageBase>
  );
 }
};

export default PaginationTablePage;