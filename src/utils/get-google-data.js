//**
// ПОЛУЧАЕМ ДАННЫЕ С ГУГЛ ТАБЛИЦЫ О КЛИЕНТАХ, ПРОЕКТАХ И СТАНЦИЯХ
//
export const getGoogleSheet = () => {
  // const url = process.env.GOOGLE_SHEET_URL_OLD;
  // console.log(url);
  const url = 'https://script.google.com/macros/s/AKfycbxX_iYuZt9Qco482UepKO4l3ZnRgPv88Zq4ZHFUEGhTmqJKCt0/exec';

  let arrFetch = [];
  let key = [];
  let obj = {};
  let json = '';

  fetch(url)
      .then(response => {
          return json = response.json();
          })
          .then( res => {

              for(let item of res.result) {
                  obj.siteID = item[0];
                  obj.siteID = obj.siteID.split(' ').join('');
                  obj.project = item[2];
                  obj.organization = item[1];
                  arrFetch.push(obj);
                  
                  
                  obj = {};
              }
          });

    console.log('arrFetchKey: ', arrFetch);
    for(let item in arrFetch) {
        key.push(item);
    }
    
    console.log('key: ', key);
    console.log('key: ', typeof(key));
  
  return arrFetch
}