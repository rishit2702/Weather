import React, { useState, useEffect } from 'react';
import { ChakraProvider, Box, Container, Input, Button, VStack, Text, HStack, useToast, Spinner, Image, theme } from '@chakra-ui/react';
import axios from 'axios';
import { SearchIcon, TimeIcon, RepeatIcon } from '@chakra-ui/icons';

interface WeatherData {
  name: string;
  main: {
    temp: number;
    humidity: number;
  };
  weather: Array<{
    main: string;
    description: string;
    icon: string;
  }>;
  wind: {
    speed: number;
  };
}

function App() {
  const [city, setCity] = useState('');
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [loading, setLoading] = useState(false);
  const [recentSearches, setRecentSearches] = useState<string[]>(() => {
    const saved = localStorage.getItem('recentSearches');
    return saved ? JSON.parse(saved) : [];
  });

  const toast = useToast();
  const API_KEY = process.env.REACT_APP_OPENWEATHER_API_KEY;

  useEffect(() => {
    localStorage.setItem('recentSearches', JSON.stringify(recentSearches));
  }, [recentSearches]);

  const fetchWeather = async (searchCity: string) => {
    if (!searchCity) return;

    setLoading(true);
    try {
      const response = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(searchCity)}&appid=${API_KEY}&units=metric`
      );

      if (response.data && response.data.cod === 200) {
        setWeather(response.data);
        
        // Update recent searches
        setRecentSearches(prev => {
          const updated = [searchCity, ...prev.filter(s => s !== searchCity)].slice(0, 5);
          return updated;
        });

        setCity('');
      } else {
        throw new Error('City not found');
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        if (error.response?.status === 401) {
          toast({
            title: 'Error',
            description: 'Invalid API key. Please check your API key in the .env file.',
            status: 'error',
            duration: 3000,
            isClosable: true,
          });
        } else {
          toast({
            title: 'Error',
            description: error.message,
            status: 'error',
            duration: 3000,
            isClosable: true,
          });
        }
      } else {
        toast({
          title: 'Error',
          description: 'An unexpected error occurred',
          status: 'error',
          duration: 3000,
          isClosable: true,
        });
      }
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    fetchWeather(city);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      fetchWeather(city);
    }
  };

  return (
    <ChakraProvider theme={theme}>
      <Box minH="100vh" bg="gray.50" py={8}>
        <Container maxW="container.md">
          <VStack spacing={8}>
            <Text fontSize="3xl" fontWeight="bold" color="blue.600">
              Weather Dashboard
            </Text>

            <HStack w="full">
              <Input
                placeholder="Enter city name..."
                value={city}
                onChange={(e) => setCity(e.target.value)}
                onKeyPress={handleKeyPress}
                bg="white"
                size="lg"
              />
              <Button
                leftIcon={<SearchIcon />}
                onClick={handleSubmit}
                colorScheme="blue"
                size="lg"
                isLoading={loading}
              >
                Search
              </Button>
            </HStack>

            {/* Recent Searches */}
            {recentSearches.length > 0 && (
              <HStack wrap="wrap" spacing={2}>
                <TimeIcon />
                {recentSearches.map((search) => (
                  <Button
                    key={search}
                    size="sm"
                    variant="outline"
                    onClick={() => fetchWeather(search)}
                  >
                    {search}
                  </Button>
                ))}
              </HStack>
            )}

            {loading && <Spinner size="xl" />}

            {weather && !loading && (
              <Box
                w="full"
                p={6}
                bg="white"
                borderRadius="lg"
                boxShadow="lg"
                position="relative"
              >
                <Button
                  size="sm"
                  position="absolute"
                  top={2}
                  right={2}
                  leftIcon={<RepeatIcon />}
                  onClick={() => fetchWeather(weather.name)}
                >
                  Refresh
                </Button>

                <VStack spacing={4}>
                  <Text fontSize="2xl" fontWeight="bold">
                    {weather.name}
                  </Text>
                  
                  <Image
                    src={`http://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
                    alt={weather.weather[0].description}
                    boxSize="100px"
                  />
                  
                  <Text fontSize="4xl" fontWeight="bold">
                    {Math.round(weather.main.temp)}°C
                  </Text>
                  
                  <Text fontSize="xl" textTransform="capitalize">
                    {weather.weather[0].description}
                  </Text>

                  <HStack spacing={8}>
                    <VStack>
                      <Text color="gray.500">Humidity</Text>
                      <Text fontWeight="bold">{weather.main.humidity}%</Text>
                    </VStack>
                    <VStack>
                      <Text color="gray.500">Wind Speed</Text>
                      <Text fontWeight="bold">{weather.wind.speed} km/h</Text>
                    </VStack>
                  </HStack>
                </VStack>
              </Box>
            )}
          </VStack>
        </Container>
      </Box>
    </ChakraProvider>
  );
}

export default App;
