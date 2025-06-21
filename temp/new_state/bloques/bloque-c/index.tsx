import '@store';
import { registerBlockType } from '@wordpress/blocks';
import { useSelect } from '@wordpress/data';

registerBlockType('mi-plugin/bloque-c', {
  edit() {
    const cliente = useSelect((select) =>
      select('mi-plugin/estado-global').getCliente()
    );

    if (!cliente) {
      return <p>Esperando cliente SDK...</p>;
    }

    return (
      <div>
        <h3>Bloque C</h3>
        <p>Cliente creado: {cliente.obtenerValor()}</p>
      </div>
    );
  },
  save() { return null; }
});