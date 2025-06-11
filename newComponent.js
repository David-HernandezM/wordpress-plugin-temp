const fs = require('fs');
const path = require('path');

if (process.argv.length < 3) {
    console.log('❌ block name not set');
    process.exit(-1);
}

const filesToCreate = [
    'block.json',
    'index.tsx',
    'frontend.tsx',
    'styles.css',
    'editor.css'
];

const blockNameArray = process.argv.slice(2);
const blockNameArrayLowerCase = blockNameArray.map(name => name.toLowerCase());
const blockDirName = blockNameArray.map(item => item.toLocaleLowerCase()).join('_');
const srcDirPath = path.join(__dirname, 'src');
const blockDirPath = path.join(srcDirPath, blockDirName);
// const blockJsonPath = path.join(blockDirPath, 'block.json');
// const indexJsPath = path.join(blockDirPath, 'index.tsx');
// const frontendJsPath = path.join(blockDirPath, 'frontend.tsx');

const blockJson = `{
  "apiVersion": 2,
  "name": "vara/${blockNameArray.join('').toLocaleLowerCase()}",
  "title": "Vara ${blockNameArray.join(' ')}",
  "category": "widgets",
  "icon": "admin-site",
  "description": "component description",
  "attributes": {},
  "editorScript": "file:./index.js",
  "script":"file:./frontend.js",
  "style": "file:./index.css",
  "editorStyle": "file:./index.css",
  "supports": {
    "color": {
      "background": true,
      "text": true
    },
    "spacing": {
      "padding": true
    },
    "border": {
      "radius": true,
      "color": true,
      "style": true,
      "width": true
    }
  }
}`;

const indexContent = `import { registerBlockType } from '@wordpress/blocks';
import { useBlockProps } from '@wordpress/block-editor';
import metadata from './block.json';
import './editor.css';
import './styles.css';

registerBlockType(metadata.name, {
    ...metadata,
    edit: () => {
        const blockProps = useBlockProps();

        return (
            <div {...blockProps}>
                <button className='vara-${blockNameArrayLowerCase.join('-')}'>Counter</button>
            </div>
        );
    },
    save: () => {
        return (
            <div {...useBlockProps.save()} className="vara-${blockNameArrayLowerCase.join('-')}-root"></div>
        );
    }
});`;

const frontendContent = `import { createRoot, useState } from "@wordpress/element";

function CounterComponent() {
    const [currentNumber, setNumber] = useState<number>(0);

    return (
        <div>
            <p>
                Number: {currentNumber}
            </p>
            <button onClick={async () => {
                setNumber(currentNumber+1);
            }}>
                Increment +
            </button>
            <button onClick={async () => {
                setNumber(currentNumber-1);
            }}>
                Decrement -
            </button>
        </div>
    );
}

document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('.vara-${blockNameArrayLowerCase.join('-')}-root').forEach(rootComponent => {
        const root = createRoot(rootComponent);
        root.render(<CounterComponent />);
    });
});`;

const filesContent = [
    blockJson,
    indexContent,
    frontendContent,
    '/* save styles file */',
    '/* editor css file */'
];

const filesToCreatePath = filesToCreate.map(fileName => path.join(blockDirPath, fileName));

if (fs.existsSync(blockDirPath)) {
    console.log('❌ block name exists: ', blockDirName);
    process.exit(-1);
}

fs.mkdirSync(blockDirPath);

try {
    const filesData = filesToCreatePath.map((filePath, index) => [filePath, filesContent[index]]);
    filesData.forEach(data => {
        fs.writeFileSync(data[0], data[1]);
    });
} catch (e) {
    console.log(e);
    console.log("❌ Error while creating block");
    process.exit(-1);
}










/*

wss://testnet.vara.network


0x878e6b486ac9e96ae2f3e36b81736a222e1abba8cb7a00481a1d04d36d494d7d


type ContractResponse = enum {
  GreenReceived,
  YellowReceived,
  RedReceived,
};

type IoContractState = struct {
  owner: actor_id,
  current_light: Light,
  callers: vec struct { actor_id, Light },
};

type Light = enum {
  Green,
  Red,
  Yellow,
};

type KeyringData = struct {
  address: str,
  encoded: str,
};

type KeyringEvent = enum {
  KeyringAccountSet,
  Error: KeyringError,
};

type KeyringError = enum {
  KeyringAddressAlreadyEsists,
  UserAddressAlreadyExists,
  UserCodedNameAlreadyExists,
  UserDoesNotHasKeyringAccount,
  KeyringAccountAlreadyExists,
  SessionHasInvalidCredentials,
  UserAndKeyringAddressAreTheSame,
};

type KeyringQueryEvent = enum {
  KeyringAccountAddress: opt actor_id,
  KeyringAccountData: opt KeyringData,
};

constructor {
  New : ();
};

service TrafficLight {
  Green : () -> ContractResponse;
  Red : () -> ContractResponse;
  Yellow : () -> ContractResponse;
  query ContractOwner : () -> actor_id;
  query TrafficLight : () -> IoContractState;
};

service KeyringService {
  BindKeyringDataToUserAddress : (user_address: actor_id, keyring_data: KeyringData) -> KeyringEvent;
  BindKeyringDataToUserCodedName : (user_coded_name: str, keyring_data: KeyringData) -> KeyringEvent;
  query KeyringAccountData : (keyring_address: actor_id) -> KeyringQueryEvent;
  query KeyringAddressFromUserAddress : (user_address: actor_id) -> KeyringQueryEvent;
  query KeyringAddressFromUserCodedName : (user_coded_name: str) -> KeyringQueryEvent;
};


*/


