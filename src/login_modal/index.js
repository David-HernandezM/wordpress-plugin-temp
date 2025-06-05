import { registerBlockType } from '@wordpress/blocks';
import { useBlockProps, InspectorControls } from '@wordpress/block-editor';
import { TextControl, TextareaControl, Button, PanelBody } from '@wordpress/components';
import { Fragment, useState } from '@wordpress/element';
import metadata from './block.json';

registerBlockType(metadata.name, {
    ...metadata,
    edit: ({ attributes, setAttributes }) => {
        return <Fragment>
            <InspectorControls>
                <PanelBody title="Configuración del JSON" initialOpen={true}>
                    <TextControl
                        label="URL destino"
                        value={attributes.url}
                        onChange={(val) => setAttributes({ url: val })}
                    />
                    <TextareaControl
                        label="JSON"
                        value={attributes.json}
                        onChange={(val) => setAttributes({ json: val })}
                    />
                </PanelBody>
            </InspectorControls>

            <div {...useBlockProps()}>
                <TextControl
                    label="URL destino"
                    value={attributes.url}
                    onChange={(val) => setAttributes({ url: val })}
                />
                {/* <TextareaControl
                    label="JSON"
                    value={attributes.json}
                    onChange={(val) => setAttributes({ json: val })}
                /> */}
                <Button onClick={() => {
                }}>Testing!!!</Button>

            </div>
        </Fragment>
    },
    save: ({ attributes }) => (
        <div {...useBlockProps.save()}>
            <button
                className="open-modal-btn"
                style={{
                    backgroundColor: 'green',
                    color: 'white',
                    padding: '8px',
                    border: 'none',
                    borderRadius: '5px'
                }}
            >
                Enviar JSON
            </button>

            <div
                className="modal-overlay"
                style={{
                    display: 'none',
                    position: 'fixed',
                    top: 0,
                    left: 0,
                    width: '100%',
                    height: '100%',
                    backgroundColor: 'rgba(0, 0, 0, 0.5)',
                    justifyContent: 'center',
                    alignItems: 'center',
                    zIndex: 1000
                }}
            >
                <div
                    className="modal-content"
                    style={{
                        backgroundColor: 'white',
                        padding: '20px',
                        borderRadius: '10px',
                        maxWidth: '400px',
                        textAlign: 'center'
                    }}
                >
                    <p>¿Deseas enviar este JSON?</p>
                    <pre>{attributes.json}</pre>
                    <button className="close-modal-btn" style={{ marginRight: '10px' }}>Cancelar</button>
                    <button
                        className="confirm-send-btn"
                        data-url={attributes.url}
                        data-json={attributes.json}
                        style={{ backgroundColor: 'green', color: 'white', padding: '8px' }}
                    >
                        Confirmar envío
                    </button>
                </div>
            </div>
        </div>
    )

    // save: ({ attributes }) => (
    //     <div {...useBlockProps.save()}>
    //         <button
    //             data-json-sender
    //             data-url={attributes.url}
    //             data-json={attributes.json}
    //             style={{ backgroundColor: 'green', color: 'white', padding: '8px' }}
    //         >
    //             Enviar JSON
    //         </button>
    //     </div>
    // )
});
