import { registerBlockType } from '@wordpress/blocks';
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
                <button className='vara-component-two'>Counter</button>
            </div>
        );
    },
    save: () => {
        return (
            <div {...useBlockProps.save()} className="vara-component-two-root"></div>
        );
    }
});