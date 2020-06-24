//**
// ПОЛУЧАЕМ ДАННЫЕ С ГУГЛ ТАБЛИЦЫ О КЛИЕНТАХ, ПРОЕКТАХ И СТАНЦИЯХ
//

export const getGoogleSheet = (url) => {
  
    let arr = [];
    let obj = {};
    let json = '';
  
    return fetch(url)
        .then(response => {
            return json = response.json();
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