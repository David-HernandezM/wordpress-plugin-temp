import '@store';
import { registerBlockType } from '@wordpress/blocks';
import { useSelect } from '@wordpress/data';

registerBlockType('mi-plugin/bloque-a', {
  edit() {
    const cliente = useSelect((select) =>
      select('mi-plugin/estado-global').getCliente()
    );

    if (!cliente) {
      return <p>Cargando SDK...</p>;
    }

    return (
      <div>
        <h3>Bloque A (con SDK)</h3>
        <p>{cliente.obtenerValor()}</p>
      </div>
    );
  },
  save() { return null; }
});