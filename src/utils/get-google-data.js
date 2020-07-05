//**
// ПОЛУЧАЕМ ДАННЫЕ С ГУГЛ ТАБЛИЦЫ О КЛИЕНТАХ, ПРОЕКТАХ И СТАНЦИЯХ
//

export const getGoogleSheet = (url) => {
  

    // async componentDidMount() {
    //     const response = await fetch(` http://www.filltext.com/?rows=32&id={number|1000}&firstName={firstName}&lastName={lastName}&email={email}&phone={phone|(xxx)xxx-xx-xx}&address={addressObject}&description={lorem|32}`)
    //     const data = await response.json()
    //      console.log(data)
    //   }


    let arr = [];
    let obj = {};
    // let json = '';
  
    return fetch(url)
        .then(response => {
            return response.json();
            })
            .then( res => {
  
                for(let item of res.result) {
                    obj.siteID = item[0];
                    obj.siteID = obj.siteID.split(' ').join('');
                    obj.project = item[2];
                    obj.organization = item[1];
                    arr.push(obj);
                    
                    obj = {};
                }
                return arr
            });
  }
