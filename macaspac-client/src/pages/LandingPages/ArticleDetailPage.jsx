import { useState, useEffect } from 'react';
import { useParams, Link as RouterLink } from 'react-router-dom';
import { Container, Box, Typography, Button, Skeleton, Stack } from '@mui/material';
import { fetchArticleBySlug } from '../../services/ArticleService';
import staticArticles from '../../assets/data/article-content';

const ArticleDetailPage = () => {
  const { slug } = useParams();
  const [article, setArticle] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadArticle = async () => {
      try {
        setLoading(true);
        setError(null);
        const { data } = await fetchArticleBySlug(slug);
        setArticle(data);
      } catch (err) {
        console.error('Error fetching article detail:', err);
        const fallback = staticArticles.find((item) => item.slug === slug);
        if (fallback) {
          setArticle({
            ...fallback,
            excerpt: fallback.excerpt,
            paragraphs: [],
            imageUrl: fallback.image,
            category: fallback.category,
          });
          setError(null);
        } else {
          setError('This article could not be loaded.');
        }
      } finally {
        setLoading(false);
      }
    };

    if (slug) {
      loadArticle();
    }
  }, [slug]);

  if (loading) {
    return (
      <Container maxWidth="lg" sx={{ py: 8 }}>
        <Stack spacing={4}>
          <Skeleton variant="rectangular" height={320} sx={{ borderRadius: 3 }} />
          <Skeleton variant="text" width="50%" height={48} />
          <Skeleton variant="text" width="30%" height={32} />
          <Skeleton variant="text" width="100%" height={24} />
          <Skeleton variant="text" width="100%" height={24} />
          <Skeleton variant="text" width="100%" height={24} />
        </Stack>
      </Container>
    );
  }

  if (error || !article) {
    return (
      <Container maxWidth="lg" sx={{ py: 8 }}>
        <Box sx={{ p: 4, bgcolor: 'rgba(15, 23, 42, 0.88)', borderRadius: 3, border: '1px solid rgba(249, 115, 22, 0.16)' }}>
          <Typography variant="h4" sx={{ color: 'common.white', mb: 2 }}>
            Article not found
          </Typography>
          <Typography sx={{ color: 'rgba(226,232,240,0.78)', mb: 3 }}>
            The article you are looking for does not appear to exist or may not be published yet.
          </Typography>
          <Button component={RouterLink} to="/articles" variant="contained" color="warning">
            Back to Articles
          </Button>
        </Box>
      </Container>
    );
  }

  const publishDate = article.publishDate
    ? new Date(article.publishDate).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
      })
    : null;

  return (
    <Container maxWidth="lg" sx={{ py: 8 }}>
      <Box sx={{ mb: 4 }}>
        <Typography variant="overline" sx={{ color: 'warning.main', letterSpacing: 2 }}>
          {article.category || 'General'}
        </Typography>
        <Typography variant="h2" sx={{ mt: 2, fontWeight: 700, color: 'common.white' }}>
          {article.title}
        </Typography>
        {publishDate && (
          <Typography sx={{ mt: 1, color: 'rgba(226,232,240,0.7)' }}>
            Published: {publishDate}
          </Typography>
        )}
      </Box>

      {article.imageUrl && (
        <Box
          sx={{
            mb: 4,
            height: 420,
            borderRadius: 3,
            overflow: 'hidden',
            backgroundImage: `url(${article.imageUrl})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        />
      )}

      <Box sx={{ p: 4, bgcolor: 'rgba(15, 23, 42, 0.88)', borderRadius: 3, border: '1px solid rgba(249, 115, 22, 0.16)' }}>
        <Typography sx={{ color: 'rgba(226,232,240,0.82)', mb: 2, whiteSpace: 'normal', overflowWrap: 'break-word', wordBreak: 'break-word' }}>
          {article.excerpt || article.paragraphs?.[0] || 'No description available.'}
        </Typography>
        {article.paragraphs
          ?.filter((paragraph, index) => !(index === 0 && paragraph === article.excerpt))
          .map((paragraph, index) => (
            <Typography key={index} sx={{ color: 'rgba(226,232,240,0.78)', mb: 2, lineHeight: 1.8, whiteSpace: 'normal', overflowWrap: 'break-word', wordBreak: 'break-word' }}>
              {paragraph}
            </Typography>
          ))}
      </Box>
    </Container>
  );
};

export default ArticleDetailPage;
