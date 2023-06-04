import {IonFab, IonFabButton, IonIcon, IonButton, IonCard, IonCardContent, IonContent, IonHeader, IonImg, IonItem, IonList, IonPage, IonText, IonTitle, IonToolbar, IonSearchbar } from '@ionic/react';
import ExploreContainer from '../components/ExploreContainer';
import './Home.css';
import { useState } from 'react';
import { Plugins } from '@capacitor/core';
import { Haptics, ImpactStyle } from '@capacitor/haptics';
import { Browser } from '@capacitor/browser';
import { ScreenReader } from '@capacitor/screen-reader';
import { Dialog } from '@capacitor/dialog';
import { AppLauncher } from '@capacitor/app-launcher';
import { GiCat } from 'react-icons/gi';


import { Toast } from '@capacitor/toast';


const { Share } = Plugins;

interface listImg {
  id: string,
  image: string,
  name: string,
  texto: string,
  video: string,
  url: string
}
const Home: React.FC = () => {
  const [imgSeleccionada, setImgSeleccionada] = useState<listImg | undefined>(undefined);

  const listImgs: listImg[] = [
    {
      id: '1',
      image: "https://th.bing.com/th/id/R.fab0c15941cc390db6441af18f5dedda?rik=vKsT6cDfHJH18Q&riu=http%3a%2f%2f4.bp.blogspot.com%2f-sN8SG0CVw2o%2fUgOp94_yB6I%2fAAAAAAAACi4%2fngK7UgE2ZZ4%2fs1600%2fgato-siames.jpg&ehk=EkQGxlSqvraSPLtOiQMLh1rNalL17xFimJKzzSlLwLs%3d&risl=&pid=ImgRaw&r=0",
      name: "Siamés",
      texto: "El gato siamés probablemente sea una de las razas de gatos más populares del mundo actual. El azul intenso de su mirada hace que nos quedemos embobados mirándolo y, si a eso le sumamos la combinación de colores en su pelaje, el resultado es un esbelto, elegante y adorable gato que nos roba el corazón. El gato siamés se trata de un felino originario de Tailandia que cuenta con dos variaciones, el siamés que trataremos, y el siamés thai o tradicional. Aunque las características de ambos son similares, realmente existen diferencias entre uno y el otro. De hecho, incluso hay gente que los confunde entre sí. Para que no te pase lo mismo, sigue leyendo esta ficha de ExpertoAnimal sobre la raza de gato siamés, su origen, características y cuidados, entre otras cosas.",
      video: "https://www.youtube.com/shorts/7-vMGBY4CCU",
      url: "https://www.expertoanimal.com/razas-de-gatos/siames.html"
    },
    {
      id: '2',
      image: "https://th.bing.com/th/id/R.93c2a56a90d9d5eeeb650a74272eba98?rik=95p35Ff7JVpLwA&riu=http%3a%2f%2f3.bp.blogspot.com%2f-8gnCYUNbyZ8%2fUgVGyoIybFI%2fAAAAAAAAAQc%2fXN1WcvlAaPI%2fs1600%2fmaine-coon-2.jpg&ehk=117E3qDZemBvasrY0AoXr990alLoriQFtavQWYcedC8%3d&risl=&pid=ImgRaw&r=0",
      name: "Maine coon",
      texto: "El gato Maine coon destaca por ser un felino grande, robusto y de carácter dócil. No obstante, debido a sus peculiaridades en cuanto a características, personalidad o cuidados, será fundamental informarnos previamente si nuestro deseo es adoptar a uno. Conocido como el gigante gentil gatuno, este felino se encuentra entre las razas de gatos gigantes más populares.",
      video: "https://www.youtube.com/shorts/UfqVJXsat2s",
      url: "https://www.expertoanimal.com/razas-de-gatos/maine-coon.html"

    },
    {
      id: '3',
      image: "https://besthousecatcare.com/wp-content/uploads/2020/05/birmanskaya-svyaschennaya-koshka-3.jpg",
      name: "Gato birmano",
      texto: "A medio caballo entre los persa y los siameses, encontramos a este curioso felino que nos cautivará, además de por su exuberante apariencia, debido a su largo pelaje y su arrebatadora mirada, por su tranquilo y dócil carácter. Así, estamos antes una raza perfecta para familias, que incluso podrá deleitarnos con pequeñas acrobacias. Quizá sea por todos estos encantos que esta raza sea una de las más populares hoy en día.",
      video: "https://youtube.com/shorts/dIJLvw8EAf4?feature=share",
      url: "https://www.expertoanimal.com/razas-de-gatos/gato-birmano.html"
    }
  ]
  const shareImage = async (imageURL: string) => {
    Dialog.confirm({
      message: '¿Deseas compartir esta imagen?',
      okButtonTitle: 'Compartir',
      cancelButtonTitle: 'Cancelar'
    }).then(async (result) => {
      if (result.value) {
        showHelloToast("Compartiendo imagen")
        try {
          await Share.share({
            title: 'Compartir imagen',
            text: '¡Mira esta imagen!',
            url: imageURL,
            dialogTitle: 'Compartir'
          });
        } catch (error) {
          console.error('Error al compartir imagen:', error);
        }
      }
    });

  };
  const hapticsVibrate = async () => {
    await Haptics.vibrate();
  };
  const showHelloToast = async (texto: string) => {
    await Toast.show({
      text: texto,
    });
  };
  const abrirWeb = async (url: string) => {
    try {
      await Browser.open({ url: url });
    } catch (error) {
      console.error('Error al abrir el video:', error);
    }
  };
  const openVideo = async (videoURL: string) => {
    await AppLauncher.openUrl({ url: videoURL });
  };
  const sayHello = async (texto: string) => {
    await ScreenReader.speak({ value: texto });
  };

  return (
    <IonPage>
      <IonHeader mode="ios">
        <IonToolbar mode="ios">
          <IonTitle>Blog "Patitas suaves"</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <div className="content-container">
          <IonList mode="ios" className="ion-no-padding">
            {listImgs.map((post) => (
              <IonItem
                key={'card-' + post.id}
                mode="ios"
                lines="none"
                className="ion-no-padding ion-no-inner-padding"
                onClick={() => {
                  setImgSeleccionada(post);
                  hapticsVibrate();
                }}
              >
                <IonCard className="ion-no-padding">
                  <div className="card-content">
                    <IonImg className="card-image" src={post.image} />
                    <IonCardContent>
                      <div className="title-container">
                        <IonText>{post.name}</IonText>
                      </div>
                    </IonCardContent>
                  </div>
                  {imgSeleccionada && imgSeleccionada.id === post.id && (
                    <div className="popup-container">
                      <IonText>
                        <p>{post.texto}</p>
                      </IonText>
                      <IonButton expand="block" className="mb-3" onClick={() => shareImage(post.image)}>
                        Compartir imagen
                      </IonButton>
                      {post.video && (
                        <IonButton expand="block" onClick={() => openVideo(post.video)}>
                          Ver video del gatito
                        </IonButton>
                      )}
                      <IonButton
                        expand="block"
                        className="mb-3"
                        onClick={() => sayHello(post.texto)}
                      >
                        Leer informacion gatuna
                      </IonButton>
                        <IonButton expand="block" className='aling-item-center' color="dark" size="large" onClick={() => abrirWeb(post.url)}>
                          <GiCat></GiCat>
                        </IonButton>
                    </div>
                  )}
                </IonCard>
              </IonItem>
            ))}
          </IonList>
        </div>
      </IonContent>
    </IonPage>
  );


};

export default Home;
