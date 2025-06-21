import '@store';
import { registerBlockType } from '@wordpress/blocks';
import { useSelect } from '@wordpress/data';

registerBlockType('mi-plugin/bloque-b', {
  edit() {
    const cliente = useSelect((select) =>
      select('mi-plugin/estado-global').getCliente()
    );

    if (!cliente) {
      return <p>Inicializando cliente...</p>;
    }

    return (
      <div>
        <h3>Bloque B</h3>
        <p>{cliente.obtenerValor()}</p>
      </div>
    );
  },
  save() { return null; }
});