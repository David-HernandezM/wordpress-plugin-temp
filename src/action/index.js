import { registerBlockType } from '@wordpress/blocks';
import { TextControl } from '@wordpress/components';
import { useBlockProps } from '@wordpress/block-editor';
import { useState } from '@wordpress/element';

registerBlockType('jsonsender/login', {
    attributes: {
        authUrl: { type: 'string', default: '' }
    },
    edit: ({ attributes, setAttributes }) => (
        <div {...useBlockProps()}>
            
            <TextControl
                label="URL de autenticación"
                value={attributes.authUrl}
                onChange={(val) => setAttributes({ authUrl: val })}
            />
            <button disabled style={{ backgroundColor: '#0073aa', color: 'white', padding: '8px' }}>
                Iniciar Sesión
            </button>
        </div>
    ),
    save: ({ attributes }) => (
        <div>
            <button
                data-json-login
                data-auth={attributes.authUrl}
                style={{ backgroundColor: '#0073aa', color: 'white', padding: '8px' }}
            >
                Iniciar Sesión
            </button>
        </div>
    )
});
