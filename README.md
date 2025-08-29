📅 Aplicación de Gestión de Citas
Este es un proyecto de aplicación móvil híbrida, construido con Vue.js, Ionic y Capacitor, que permite a los usuarios agendar citas y llevar un registro de su historial. La aplicación se conecta a una base de datos remota de Firebase Firestore y simula notificaciones push para recordatorios de citas.

✨ Características Principales
Autenticación de Usuarios: Registro e inicio de sesión con Firebase Authentication.

Reserva de Citas: Los usuarios pueden seleccionar una fecha, hora y motivo para agendar una cita.

Base de Datos Remota: Las citas se almacenan de forma segura en una base de datos Firebase Firestore.

Historial de Citas: Los usuarios pueden ver una lista completa de sus citas agendadas, actualizada en tiempo real.

Notificaciones Simuladas: La aplicación simula el envío de una notificación toast 15 minutos antes de la hora de la cita.

Navegación Intuitiva: Interfaz de usuario con pestañas para una navegación fácil entre las diferentes secciones de la aplicación.

🛠️ Tecnologías Utilizadas
Vue.js 3

Ionic Framework

Capacitor

Firebase:

Firebase Authentication: Para la gestión de usuarios.

Firebase Firestore: Como base de datos remota para almacenar citas.

🚀 Cómo Poner en Marcha el Proyecto
1. Clona el Repositorio
Si aún no lo has hecho, clona el proyecto desde GitHub.

git clone [https://github.com/tu-usuario/nombre-del-repositorio.git](https://github.com/tu-usuario/nombre-del-repositorio.git)
cd nombre-del-repositorio

2. Instalar Dependencias
Asegúrate de tener Node.js y npm instalados. Luego, instala las dependencias del proyecto.

npm install

3. Configurar Firebase
Para conectar la aplicación a tu propia base de datos, necesitas configurar un proyecto en Firebase.

Crea un nuevo proyecto en la Consola de Firebase.

Habilita Authentication y Firestore Database.

Copia tus credenciales de configuración de Firebase y crea un archivo de entorno (por ejemplo, .env) o directamente en el archivo src/services/firebase.ts.

4. Ejecutar la Aplicación
Una vez que las dependencias estén instaladas y Firebase configurado, puedes ejecutar la aplicación en el navegador.

ionic serve

La aplicación se abrirá en tu navegador por defecto. Desde allí, podrás registrarte, agendar citas y ver la simulación de las notificaciones.

Capturas 
<img width="502" height="811" alt="Captura de pantalla 2025-08-29 093633" src="https://github.com/user-attachments/assets/d825ee35-6cc5-4974-bb94-20324f13cfea" />
<img width="652" height="250" alt="Captura de pantalla 2025-08-29 093638" src="https://github.com/user-attachments/assets/4eafb016-84be-438e-b431-249ee4dba1f6" />
<img width="293" height="758" alt="Captura de pantalla 2025-08-29 093645" src="https://github.com/user-attachments/assets/0215bffb-b98c-445c-bc02-2a4197f634b8" />
