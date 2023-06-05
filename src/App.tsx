import { Post, PostType } from './components/Post';
import { Header } from './components/Header';
import { Sidebar } from './components/Sidebar';

import './global.css';
import styles from './App.module.css';


const posts:PostType[] = [
  {
    id:1,
    author: {
      avatarUrl: 'https://media.licdn.com/dms/image/C4E03AQEBACqZ1oYK0g/profile-displayphoto-shrink_200_200/0/1591221954751?e=1690416000&v=beta&t=cOwgmotbNxgSQ2gdKOIX-x_DDPVVmp0iBpMKwdGeRY0',
      name: 'Maria Llop',
      role: 'Designer'
    },
    content:[
      { type: 'paragraph', content: 'Fala galeraa 👋'},
      { type: 'paragraph', content: 'Acabei de subir mais um projeto no meu portifólio. É um projeto que fiz no NLW Return, evento da Rocketseat. O nome do projeto é DoctorCare 🚀 '},
      { type: 'Link', content: 'jane.design/doctorcare'},
    ],
    publishedAt: new Date('2023-05-26 15:00:00')
  },
  {
    id:2,
    author: {
      avatarUrl: 'https://media.licdn.com/dms/image/C4D03AQFU5Mt5xdywfQ/profile-displayphoto-shrink_200_200/0/1623862288539?e=1690416000&v=beta&t=T5Er5QEP4XdWgsUoNwMWPS8qxvuwOOI453vq49b9bHQ',
      name: 'Caíque Apolônio',
      role: 'Jornalista'
    },
    content:[
      { type: 'paragraph', content: 'Boa tarde galera!'},
      { type: 'paragraph', content: 'Venho apresentar pra vocês meu novo artigo publicado na revista Jornal Culture, no qual analiso a comunicação política como elento de persuação para uma mudança de comportamento social'},
      { type: 'Link', content: 'jornalculture.street/caiqueapol'},
    ],
    publishedAt: new Date('2023-05-26 16:00:00')
  },
]

export function App() {
  return (
    <>
      <Header />

      <div className={styles.wrapper}>
        <Sidebar />
        <main>
          {posts.map(post => {
            return (
              <Post 
                key={post.id}
                post={post}
              />
            )
          })}
        </main>
      </div>

    </>
  )
}

