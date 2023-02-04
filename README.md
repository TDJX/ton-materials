# Для создания конфигурации коллекции и самих nft изучить script.md и README_OLD.md 

# Для понимания:

Коллекция nft tondiamonds/ton-nft-deployer имеет следующие параметры:

- ownerAddress: walletAddress,
- royalty: this.config.collection.royalty,
- royaltyAddress: walletAddress,
- collectionContentUri: this.config.collection.content,
- nftItemContentBaseUri: this.config.collection.base,
- nftItemCodeHex: this.nftItemCode,

Сам смартконтракт коллекции берется из стандартных nft-collection-editable.fc из TonWeb.

Но смартконтракт nft-item мы можем загружать извне из boc (cell)-файла (скомпилированная ячейка кода), который мы можем
получить командой ниже:

npx func-js src/contracts/stdlib.fc src/contracts/op-codes.fc src/contracts/params.fc src/contracts/nft-item-editable.fc --boc src/build/nft-item-editable.cell
(здесь подключаются дополнительные файлы, содержащие наименования кодов операций, ton standard lib и некоторые параметры
и компилируется fc-файл в cell-файл при помощи пакета func-js)

Затем преобразовать: Cell -> string и передать параметром в Deployer файла index.js:

const nftItemHex = TonWeb.utils.bytesToHex(fs.readFileSync('src/build/nft-item-editable.cell'))
const deployer = new Deployer(config, nfts, nftItemHex)
deployer.start()

Таким образом, можно эксперементировать со смартконтрактами nft-item, используя скрипт ton-diamonds

# НЕ ЗАБЫВАЙТЕ build-ить проект перед start

# Errors:

[Deployer] deployNft error Error: http provider parse response error
# Возникает, когда деплоишь одну и ту же data коллекции и нфт (нужно менять данные в json-файлах, потому что дубли неприемлемы)

[TonWeb] Not enough bytes for cells data 
# Когда загружаем сырую ячейке с помощью fs, класс и метод Cell.fromBoc должны быть из пакет ton, а не из TonWeb,
# но сейчас это уже неактуально

[Deployer] NFT item already exists 0
[Deployer] deployNft error Error: Nft not exists
# Проблема со структурой message между js и нашим смартконтрактом
