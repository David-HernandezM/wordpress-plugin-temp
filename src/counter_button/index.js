import { registerBlockType } from '@wordpress/blocks';
import { useBlockProps, InspectorControls } from '@wordpress/block-editor';
import { TextControl, TextareaControl, Button,ButtonGroup, P, PanelBody } from '@wordpress/components';
import { Fragment, useState } from '@wordpress/element';
import metadata from './block.json';
import './styles.css';

registerBlockType(metadata.name, {
    ...metadata,
    edit: ({ attributes, setAttributes }) => {
        const [numberSelected, setNumberSelected] = useState(false);
        return <Fragment>
            <InspectorControls>
                <PanelBody title="Configuración del JSON" initialOpen={true}>
                    <TextareaControl
                        label="Initial number:"
                        value={attributes.initialNumber}
                        onChange={(val) => setAttributes({ initialNumber: val })}
                    />
                </PanelBody>
            </InspectorControls>

            <div {...useBlockProps()}>
                {
                    !numberSelected && (
                        <>
                            <TextControl
                                label="Initial number"
                                value={attributes.initialNumber}
                                onChange={(val) => setAttributes({ initialNumber: val })}
                            />
                            <Button onClick={() => setNumberSelected(true)}>
                                Accept initial number
                            </Button>
                        </>
                    )
                }
                {
                    numberSelected && (
                        <ButtonGroup>
                            <Button variant='primary'>
                                Number: {attributes.initialNumber}
                            </Button>|
                            <Button>
                                Increment +
                            </Button>
                            <Button>
                                Decrement -
                            </Button>
                        </ButtonGroup>
                    )
                }
                
            </div>
        </Fragment>
    },
    save: ({ attributes }) => (
        <div 
            {...useBlockProps.save()}
            // id='vara-counter-button'
            className='vara-counter-button-root'
            data-initialnumber={attributes.initialNumber}
        ></div>
    )
});








/*

LUIS A DIARIO ESTARA CHECANDO EL STATUS DE LAS ACTIVIDADEEEEESSS!!!

LUIS NOS ASIGNARA LAS ACTIVIDADES A CADA UNO PARA QUE LAS PODAMOS REALIZAR, PARA QUE SE LOGRE EN ESTAS FECHAS
VEREMOS TAREAS QUE NOS ASIGNARAN, ----REVISARLAS---- Y VER KEONDA ENTRE HOY Y MAÑANA, SI NOS LO ACEPTAN 
TENDREMOS QUE TRABAJAR FUERTEMENTE EN ESTO, ES NUESTRA ULTIMA OPORTUNIDAD, YA QUE TRISTEMENTE NO HAY MUCHO TIEMPO 
PARA VARA SI NO FUNCIONA, SE CREE QUE TENEMOS BUENAS POSIBILIDADES.

Luis esta cargo de la estrategia, nosotros somos el apoyo para que esto se logre en diferentes
vertientes, tecnica, marketing, etc
Somos actualmente 50 personas en la fundacion, en donde no aportan bastante al proyecto como a javi
por parte de nosotros no nos tienen en el radar, tenemos que seguir en contacto con equipos fundamentales de vara

La estrategia que menciona luis es parte del exito para vara de este año, platicar con ellos para que se pongan la 
pilas los proyectos, hay que apoyar a los proyectos, y si esto funciona, le daremos a VARA un segundo aire
para que nos conozcan en diferentes sectores

es un reto grande );, pero se puede realizar

Nos va a pasar informacion de esto luis, y conforme se vaya obteniendo mas informacino

EL rol del luis ahorita, su tarea principal es estrategia principal de diferentes proyectos, luis ya no mete codig
pero el rol de luis es conectar todo lo que tenemos para lograr que el proyecto creezca, estrategias en las que esta
relacionado (luis nos asignara las tareas )):):

- Community estrategies:
    - VaraAI Bot: los deadlines son cuando el proyecto comienzan a iniciar o estan en produccion.
    - Varathon
    - Gear Academy: DAVID, apoyar a luis para evaluar para que el contenido sea propio para los desarrolladores
        para que sea un exito y puedan involucrar las herramientas actuales.
    - Marketplace: se tiene un showroom cerrado, encontrar a una comunidad que se pueda llevar que lo pueda lanzar
        ya que vara no lo puede lanzar por temas legales, luis lo retomo para que este se lleve por la comunidad.
        EL ecosistema gasless para esto, para que sea un gancho para nuevos usuarios
    - Memecoins: se va a reactivar, faltan ciertas funciones commo poner a la venta los memecoins, nadie los puede
        comprar, se pondra en el DEX y se evaluan las estrategias para ello
    - New Ambassador program: ya se inicio el nuevo programa, para dividirse en dos partes, embjadores pagados y 
        embabadores que hacen tarea por rewards, la mejor tarea sera recompensada, lo maneja solana, avr que tal 
        funciona.
    - Grants Program: aquellos que tengan su mvp funcionando y con usuarios se podran apoyar con parte tecnica, dar
        el grant o presentarlos con vcs
- Vara Ecosystem Proyects (estos proyectos tienen que ser signless, a adrian le mando un documento para checar su
  status actual para ver keonda, luis los ordeno de los mas importantes a los menos importantes):
    - VarSwap: el siguiente lunes podran, no es bueno porque se estan tardando, acceso a su interfaz para validar
        que funcionan los swaps para checar que funcionen, les paso la info del bridge y les mando tokens de
        prueba para que hagan la integracion, se espera que estos dias manden su frontend para analisarlo y el lunes
        que nos den una presentacion para que chequemos que onda para que se continue con el proyecto, se tiene
        previsto que entre en mainnet el 30 de este mes, se tiene que definir la validacion del frontend (auditoria
        externa, interna, embajadores, etc) pero ya se pudo deadlines, se puede mover pero unicamente para atras,
        osea, entregar cuanto antes.
    - Guardian protocol: se esta negociando como es el tema de la liquidez, vara puede apoyar con ciertos montos
        para que inicien con ciertos protocolos
    - VStreet: estan haciendo actualizaciones.
    - GAIA estan esperando al dex (VarSwap).
    - DavAI: lo esta haciendo david ocn un equipo para resolver problemas de robo con AI
    - SkAI: MICH los rascacielos haciendo un ecosistema en los  rascacielos
    - Tourii: (ESTE PREOCUPA) 
    - Black Trade: necesita el plugin de wordpress, esta proyectado para el siguiente mes (tres meses)
    - EduGrants: 3 meses para que puedan terminal
    - CyberClub: darle seguimiento segun faltaba poco con lo que platico con beni, para sacarlo el otro mes
    - Varan Wallet: es una wallet en telegram, ya funciona, ya permite hacer algunos swaps, ya podria lanzarse
        a mainnet para tener un ecosistema de diferentes aplicaciones para darles a los usuarios, ellos no ven
        que tengan un ecosistema
    - VaraDEX: es un dex que esta construyendo el equipo de SubWallet, le estan dando prioridad, se tiene que apurar
        VarSwap si no se va a cambiar a por VaraDex.
- Vara Grants projects:
    Posibles proyectos:
    - GasYard Finance
    - SODAX
    - DexTrade
    - Decentra
- Tooling Developers
    Marketing ya debe de estar preparado para estos proyectos
    - ELiza AI Agent, lo esta haciend hang biao
    - AI Code Generator (para el 16 de junio se tiene que tener ya para produccion)
    - Back-end generic RPC: se valida con las cookies para ver que onda, se debe de tener para el 30 de este mes.
- General Tasks: tareas generales
    -
    -
    -
    - 



LA CUENTA SUBWALLET UNICAMENTE PARA PODER FIRMAR, EN ESTE CASO, LOS GASFEES, EN CASO DE QUE SE REQUIRA MOVER POR
EJEMPLO 1 MILLON TE TOKENS, SERIA CON LA CUENTA ORIGINAL DEL USUARIO, POR EJEMPLO, SE TENDRIA UNA ABSTRACCION
PARCIAL PARA QUE CUENTAS CON WALLET PUEDAN MOVER SUS TOKENS, ENTONCE SERIA ALGO PARCIAL, DIGAMOS, DE NUEVO PARA
GUARDIAN, DETECTA QUE MANDARIA 500 TOKENS, QUE NO PAGUE GAS FEES, NO FIRMO, Y YA ESTAN LOS TOKENS EN EL PROTOCOLO
AQUI TENDRIAMOS QUE OPTENER LOS TOKENS DEL USUARIO SIN LA NECESIDAD DE FIRMAR

VARSWAP, GUARDIAN, VSTREET, RESOLVER EL TEMA ASI, QUE SI SE CONTENGA LA WALLET, PERO QUE NUNCA TENGAN QUE FIRMAR


Adrian va a llevar un documento que acaban de mandar, tenemos que tener un proyecto que represente a latam
la estrategia de adrian es entender como llevaran su proyecto

traer un proyecto, seguir la metodologia de luis

LOS DEADLINES NO SE PUEDEN CAMBIAR MAS ALLA DE ELLO, OSEA A MAS TIEMPOS, UNICAMENTE AL REVEZ, EN MENOS TIEMPO.


-------------------------------
YA MANEJAR MEJOR EL TIEMPO EN CLICKUP PARA CHECAR KEONDA, PARA DECIR QUE CONSTRUI, ETC.

SI ESTO FUNCIONA, LUIS NOS AUMENTARA EL SUELDOOOOOOO DAR LO MEJOR PARA NOSOTROS, HACER LO MEJOR POSIBLE Y SALGA
LUIS SE SENTARA PERSONALMENTE PARA ALEX PARA DARNOS MEJORES SUELDOS O PRESTACIONES. PROBABILIDAD ALTA DE QUE NOS 
SALGA BIEN.

TENER EN EL RADAR EN EL SEGUIMIENTOOOOOOOOOOOOOOOOOOO AAAAAAAAAAAAAAAAAAAAAAAAH
PREGUNTAR A DIARIO COMO VAN, REUNIR UNA LLAMADA, ETC, PICAR COSTILLAS PARA REALIZARLO, NO LE GUSTA A LUIS, PERO PUES
NADA

USAR RECURSOS DE DEFI PARA EL ACADEMY, PROYECTO FINAL DEFI PARA LOS ALUMNOS, ACADEMY CON NUEVA ESTRATEGIA PARA LOS
AI AGENTS, VARATHON DE AI AGENTS, SER MUY ESPECIFICOS, HAY QUE ENFOCARNOS EN ALGO MUY PARTICULAR.
-------------------------------

*/
