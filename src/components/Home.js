import React, {useState, useEffect} from 'react';
import {Language, NumeralForm, convertNumberToNumeralForm} from 'numerals';
import RNShake from 'react-native-shake';
import {client} from './../constants/connection';
import {gql, useQuery} from '@apollo/client';
import {StyleSheet, Text, View, SafeAreaView} from 'react-native';
const STAR_WARS_FILMS = gql`
  {
    allPlanets {
      totalCount
      planets {
        name
        filmConnection {
          totalCount
          films {
            episodeID
          }
        }
      }
    }
  }
`;

export default function Home() {
  const [loading, setLoading] = useState(true);
  const [planets, setPlanets] = useState();
  const [planet, setPlanet] = useState();
  useEffect(() => {
    loadData();
    RNShake.addListener(() => {
      randomPlanet();
    });
    // return () => RNShake.removeEventListener();
  }, []);

  const randomPlanet = () => {
    setLoading(true);
    setPlanet(planets[Math.floor(Math.random() * planets.length)]);
    setLoading(false);
  };
  const loadData = () => {
    console.log('Loading Data...');
    return client
      .query({
        query: gql`
          {
            allPlanets {
              totalCount
              planets {
                name
                filmConnection {
                  totalCount
                  films {
                    episodeID
                  }
                }
              }
            }
          }
        `,
      })
      .then(result => {
        setPlanets(result.data.allPlanets.planets);
        randomPlanet();
      })
      .catch(err => console.log({err}));
  };

  if (loading) {
    return <Text>Loading...</Text>;
  }
  

  return (
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <Text style={{textAlign: 'center', fontSize: 30}}>{planet.name}</Text>
      <View style={{flexDirection: 'row', justifyContent: 'center'}}>
        {planet.filmConnection.films.length >= 1 ? (
          planet.filmConnection.films.map(film => (
            <Text>
              {convertNumberToNumeralForm(
                film.episodeID,
                NumeralForm.Roman,
                Language.English,
              )}{' '}
            </Text>
          ))
        ) : (
          <Text>No Films</Text>
        )}
      </View>
    </View>
  );
}
