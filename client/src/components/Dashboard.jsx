import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import Ticker from 'react-ticker';
import { Carousel } from 'react-responsive-carousel';
import AuthContext from '../contexts/AuthContext';
import UserContext from '../contexts/UserContext';
import FavTeam from './FavTeam';

const Dashboard = ({ user }) => {
  const [loggedIn, setLoggedIn] = useContext(AuthContext);
  const [username, setUsername] = useContext(UserContext);
  const [favTeam, setFavTeam] = useState(null);
  const [news, setNews] = useState([]);
  const logout = () => {
    axios({
      method: 'get',
      url: 'http://localhost:6969/logout',
    })
      .finally(() => {
        setUsername(null);
        setLoggedIn(false);
      });
  };
  const setTeam = (team) => {
    setFavTeam(team);
  };
  useEffect(() => {
    if (user) {
      axios({
        method: 'get',
        url: `http://localhost:6969/${user}/favoriteTeam`,
      })
        .then((res) => {
          if (res.data !== 'No favorite team set' && res.data !== null) {
            if (!favTeam || favTeam.id !== res.data.id) {
              setFavTeam(res.data);
            }
          }
        });
    }
  });
  useEffect(() => {
    if (favTeam !== null && favTeam !== '') {
      axios({
        method: 'get',
        url: `http://localhost:6969/news/${favTeam.name}`,
      })
        .then((res) => {
          setNews(res.data);
        });
    }
  }, [favTeam]);
  return username ? (
    <div>
      <header className={favTeam ? favTeam.abbreviation : 'default'}>
        {user}
        <FavTeam user={user} favTeam={favTeam} setTeam={setTeam} />
        <button type="button" onClick={logout}>Logout</button>
      </header>
      <div id="dashboard-body" className={favTeam ? favTeam.abbreviation : 'default'}>
        <section>
          {/* <Ticker speed={10} mode="smooth">
            {() => (
              <>
                <h1>This is the headline of element #1!</h1>
                <img src="https://sportsfancovers.com/wp-content/uploads/2020/07/Washington_Nationals_logo_low_res-1.png" alt="Nats logo" />
              </>
            )}
          </Ticker> */}
          <Carousel>
            {news.map((article) => (
              <a href={article.url}>
                <img src={article.urlToImage} alt="" />
                <p className="legend">{article.title}</p>
              </a>
            ))}
            {/* <div>
              <img src="https://cdn.pixabay.com/photo/2014/02/27/16/10/tree-276014__340.jpg" alt="" />
              <p className="legend">a cool pic</p>
            </div>
            <div>
              <img src="https://thumbs.dreamstime.com/b/concept-open-magic-book-pages-water-land-small-child-fantasy-nature-learning-copy-space-166401875.jpg" alt="" />
              <p className="legend">Another Cool Pic</p>
            </div> */}
          </Carousel>
        </section>
      </div>
    </div>
  ) : null;
};

export default Dashboard;
