import * as SecureStore from 'expo-secure-store';

const deviceStorage = {
    //storage functions here
/*     async saveKey(key, value) {
        try {
            await AsyncStorage.setItem(key, value);
        } catch(error) {
            console.log('AsyncStorage error: ' + error.message);
        }
    } */
}
//Params: key, value
//SecureStore.setItemAsync(token, value)

getProducts = () => {
    const url = 'https://staging.appcms.dk/api/cX8hvUC6GEKGgUuvzsBCNA/content/da';
    const cmsHeader = { 
      'Content-Type': 'application/json', 
      //'Authorization': `Bearer ${this.props.userToken}` 
    };
    axios.get(url,cmsHeader)
    .then((res) => {
      const contentItems = res.data.data.products.items;
      //this.props.setItems(contentItems);
      contentItems.forEach( async item => {
        const bigUrl = item.big_image.file_url;
        const smallUrl = item.list_image.file_url;
        const digestBig = await Crypto.digestStringAsync(Crypto.CryptoDigestAlgorithm.SHA256, bigUrl);
        const digestSmall = await Crypto.digestStringAsync(Crypto.CryptoDigestAlgorithm.SHA256, smallUrl);
        const bigImgPath = `${FileSystem.cacheDirectory}${digestBig}`;
        const smallImgPath = `${FileSystem.cacheDirectory}${digestSmall}`;
        const getBigImg = await FileSystem.getInfoAsync(bigImgPath);
        const getSmallImg = await FileSystem.getInfoAsync(smallImgPath);
        const tryWrite = await FileSystem.writeAsStringAsync(bigImgPath, 'TEST');
        console.log("Write: ", await tryWrite);
        /* console.log('Big path: ', item.big_image.file_url);
        console.log('Small path: ', item.list_image.file_url);
        console.log("----------------"); */
        return
      })
      this.props.setItems(contentItems);
      console.log("contentItems: ", this.props.contentItems);
    })
    .catch(error => console.log(error))
  }