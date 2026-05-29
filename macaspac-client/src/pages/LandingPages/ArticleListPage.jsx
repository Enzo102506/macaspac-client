import { useState, useEffect } from 'react';
import { Container, Grid, Stack, Typography, Box, Card, CardContent } from '@mui/material';
import { fetchArticles } from '../../services/ArticleService';

const ArticleListPage = () => {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadArticles = async () => {
      try {
        const { data } = await fetchArticles();
        // Filter to show only active articles
        const activeArticles = data.filter((article) => article.status === 'active' && article.isActive);
        setArticles(activeArticles);
      } catch (error) {
        console.error('Error fetching articles:', error);
      } finally {
        setLoading(false);
      }
    };
    loadArticles();
  }, []);

  if (loading) {
    return (
      <Container maxWidth="lg" sx={{ py: 8 }}>
        <Typography>Loading articles...</Typography>
      </Container>
    );
  }

  return (
    <Container maxWidth="lg" sx={{ py: 8 }}>
      <Stack spacing={6}>
        <Box>
          <Typography
            variant="overline"
            sx={{ color: 'warning.main', letterSpacing: 2 }}
          >
            Knowledge Base
          </Typography>
          <Typography
            variant="h2"
            sx={{ mt: 2, fontWeight: 700, color: 'common.white' }}
          >
            Articles & Stories
          </Typography>
          <Typography sx={{ mt: 2, color: 'rgba(226,232,240,0.78)', maxWidth: 600 }}>
            Explore our collection of articles and stories. Each article provides insights and detailed
            information on various topics related to our Soul Reaper universe.
          </Typography>
        </Box>

        {articles.length === 0 ? (
          <Card
            sx={{
              p: 4,
              textAlign: 'center',
              bgcolor: 'rgba(15, 23, 42, 0.88)',
              border: '1px solid rgba(249, 115, 22, 0.18)',
            }}
            elevation={0}
          >
            <Typography sx={{ color: 'rgba(226,232,240,0.78)' }}>
              No articles available at the moment.
            </Typography>
          </Card>
        ) : (
          <Grid container spacing={3}>
            {articles.map((article) => (
              <Grid item xs={12} sm={6} md={4} key={article._id}>
                <Card
                  sx={{
                    h: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    bgcolor: 'rgba(15, 23, 42, 0.88)',
                    border: '1px solid rgba(249, 115, 22, 0.18)',
                    transition: 'all 0.3s ease',
                    '&:hover': {
                      borderColor: 'rgba(249, 115, 22, 0.35)',
                      transform: 'translateY(-4px)',
                    },
                  }}
                  elevation={0}
                >
                  <CardContent sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
                    <Stack spacing={2} sx={{ flexGrow: 1 }}>
                      <Box
                        sx={{
                          display: 'inline-block',
                          px: 2,
                          py: 1,
                          bgcolor: 'rgba(249, 115, 22, 0.15)',
                          borderRadius: '12px',
                          width: 'fit-content',
                        }}
                      >
                        <Typography
                          variant="caption"
                          sx={{
                            color: 'warning.main',
                            fontSize: '0.75rem',
                            fontWeight: 700,
                            letterSpacing: '0.1em',
                          }}
                        >
                          {article.slug.toUpperCase()}
                        </Typography>
                      </Box>

                      <Typography
                        variant="h5"
                        sx={{
                          fontWeight: 700,
                          color: 'common.white',
                          lineHeight: 1.3,
                        }}
                      >
                        {article.title}
                      </Typography>

                      <Typography
                        sx={{
                          color: 'rgba(226,232,240,0.78)',
                          fontSize: '0.95rem',
                          lineHeight: 1.6,
                        }}
                      >
                        {article.paragraphs?.[0] || 'No preview available'}
                      </Typography>

                      <Box sx={{ mt: 'auto', pt: 2 }}>
                        <Typography
                          variant="caption"
                          sx={{
                            color: 'rgba(226,232,240,0.6)',
                            display: 'block',
                          }}
                        >
                          {article.paragraphs?.length || 0} section{article.paragraphs?.length !== 1 ? 's' : ''}
                        </Typography>
                      </Box>
                    </Stack>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        )}
      </Stack>
    </Container>
  );
};

export default ArticleListPage;
