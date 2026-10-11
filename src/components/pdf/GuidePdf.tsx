import React from 'react';
import {
  Document,
  Page,
  Text,
  View,
  Image,
  StyleSheet,
} from '@react-pdf/renderer';
import { Guide } from '@/types/guide';

const styles = StyleSheet.create({
  // Base Page Styles
  coverPage: {
    fontFamily: 'Helvetica',
    backgroundColor: '#FFFFFF',
    paddingTop: 50,
    paddingBottom: 50,
    paddingHorizontal: 48,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
  },
  contentPage: {
    fontFamily: 'Helvetica',
    backgroundColor: '#FFFFFF',
    paddingTop: 54,
    paddingBottom: 54,
    paddingHorizontal: 48,
  },

  // Cover Page Elements
  brandRow: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 32,
  },
  brandBadge: {
    backgroundColor: '#EEF2FF',
    borderRadius: 4,
    paddingVertical: 4,
    paddingHorizontal: 8,
    border: '1 solid #C7D2FE',
  },
  brandBadgeText: {
    fontSize: 9,
    fontFamily: 'Helvetica-Bold',
    color: '#4F46E5',
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
  coverTitle: {
    fontSize: 26,
    fontFamily: 'Helvetica-Bold',
    color: '#0F172A',
    lineHeight: 1.25,
    marginBottom: 14,
  },
  coverSummary: {
    fontSize: 11,
    fontFamily: 'Helvetica',
    color: '#475569',
    lineHeight: 1.6,
    marginBottom: 24,
  },
  metaCard: {
    backgroundColor: '#F8FAFC',
    borderRadius: 6,
    border: '1 solid #E2E8F0',
    padding: 14,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 28,
  },
  metaItem: {
    display: 'flex',
    flexDirection: 'column',
  },
  metaLabel: {
    fontSize: 8,
    fontFamily: 'Helvetica-Bold',
    color: '#64748B',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
    marginBottom: 3,
  },
  metaValue: {
    fontSize: 10,
    fontFamily: 'Helvetica-Bold',
    color: '#1E293B',
  },

  // Table of Contents
  tocContainer: {
    marginTop: 8,
    borderTop: '1 solid #F1F5F9',
    paddingTop: 18,
  },
  tocHeader: {
    fontSize: 9,
    fontFamily: 'Helvetica-Bold',
    color: '#6366F1',
    textTransform: 'uppercase',
    letterSpacing: 1,
    marginBottom: 12,
  },
  tocRow: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  tocBadge: {
    width: 18,
    height: 18,
    borderRadius: 9,
    backgroundColor: '#EEF2FF',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 8,
  },
  tocBadgeText: {
    fontSize: 8,
    fontFamily: 'Helvetica-Bold',
    color: '#4F46E5',
    textAlign: 'center',
  },
  tocStepTitle: {
    fontSize: 9.5,
    fontFamily: 'Helvetica',
    color: '#334155',
    flex: 1,
  },
  coverFooter: {
    borderTop: '1 solid #E2E8F0',
    paddingTop: 14,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  coverFooterText: {
    fontSize: 8,
    fontFamily: 'Helvetica',
    color: '#94A3B8',
  },

  // Running Header & Footer for Content Pages
  runningHeader: {
    position: 'absolute',
    top: 24,
    left: 48,
    right: 48,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottom: '1 solid #F1F5F9',
    paddingBottom: 6,
  },
  runningHeaderTitle: {
    fontSize: 8,
    fontFamily: 'Helvetica',
    color: '#64748B',
    maxWidth: 360,
  },
  runningHeaderBrand: {
    fontSize: 8,
    fontFamily: 'Helvetica-Bold',
    color: '#6366F1',
  },
  runningFooter: {
    position: 'absolute',
    bottom: 24,
    left: 48,
    right: 48,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderTop: '1 solid #F1F5F9',
    paddingTop: 6,
  },
  runningFooterText: {
    fontSize: 8,
    fontFamily: 'Helvetica',
    color: '#94A3B8',
  },

  // Step Element Styles
  stepCard: {
    marginBottom: 20,
    backgroundColor: '#FFFFFF',
    border: '1 solid #E2E8F0',
    borderRadius: 6,
    padding: 14,
  },
  stepHeaderRow: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 8,
  },
  stepNumberBadge: {
    width: 22,
    height: 22,
    borderRadius: 11,
    backgroundColor: '#6366F1',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 10,
    flexShrink: 0,
  },
  stepNumberText: {
    fontSize: 10,
    fontFamily: 'Helvetica-Bold',
    color: '#FFFFFF',
    textAlign: 'center',
  },
  stepTitle: {
    fontSize: 12.5,
    fontFamily: 'Helvetica-Bold',
    color: '#0F172A',
    lineHeight: 1.3,
    flex: 1,
    marginTop: 2,
  },
  stepDescription: {
    fontSize: 9.5,
    fontFamily: 'Helvetica',
    color: '#334155',
    lineHeight: 1.5,
    marginBottom: 10,
    paddingLeft: 32,
  },
  imageWrapper: {
    marginTop: 4,
    paddingLeft: 32,
    display: 'flex',
    alignItems: 'center',
  },
  stepImage: {
    width: '100%',
    maxHeight: 250,
    objectFit: 'contain',
    borderRadius: 4,
    border: '1 solid #E2E8F0',
    backgroundColor: '#0F172A',
  },

  // Empty State Styles
  emptyBox: {
    padding: 30,
    borderRadius: 6,
    backgroundColor: '#F8FAFC',
    border: '1 dashed #CBD5E1',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 40,
  },
  emptyTitle: {
    fontSize: 12,
    fontFamily: 'Helvetica-Bold',
    color: '#475569',
    marginBottom: 6,
  },
  emptyText: {
    fontSize: 9.5,
    fontFamily: 'Helvetica',
    color: '#94A3B8',
    textAlign: 'center',
  },
});

export interface GuidePdfProps {
  guide: Guide;
}

export const GuidePdf: React.FC<GuidePdfProps> = ({ guide }) => {
  const steps = guide.steps || [];
  const formattedDate = guide.createdAt
    ? new Date(guide.createdAt).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
      })
    : 'Recently';

  return (
    <Document
      title={guide.title || 'StepSnap Guide'}
      author={guide.authorName || 'StepSnap User'}
      subject={guide.summary || 'Step-by-step visual documentation'}
      keywords="StepSnap, Documentation, Guide, Tutorial, Scribe Alternative"
    >
      {/* 1. COVER PAGE */}
      <Page size="A4" style={styles.coverPage}>
        <View>
          {/* Top Brand Tag */}
          <View style={styles.brandRow}>
            <View style={styles.brandBadge}>
              <Text style={styles.brandBadgeText}>StepSnap Guide</Text>
            </View>
          </View>

          {/* Guide Title & Summary */}
          <Text style={styles.coverTitle}>{guide.title || 'Untitled Guide'}</Text>
          <Text style={styles.coverSummary}>
            {guide.summary || 'No summary provided.'}
          </Text>

          {/* Metadata Card */}
          <View style={styles.metaCard}>
            <View style={styles.metaItem}>
              <Text style={styles.metaLabel}>Author</Text>
              <Text style={styles.metaValue}>{guide.authorName || 'Anonymous'}</Text>
            </View>
            <View style={styles.metaItem}>
              <Text style={styles.metaLabel}>Published</Text>
              <Text style={styles.metaValue}>{formattedDate}</Text>
            </View>
            <View style={styles.metaItem}>
              <Text style={styles.metaLabel}>Total Steps</Text>
              <Text style={styles.metaValue}>{steps.length} {steps.length === 1 ? 'Step' : 'Steps'}</Text>
            </View>
          </View>

          {/* Table of Contents (shown when steps exist) */}
          {steps.length > 0 && (
            <View style={styles.tocContainer}>
              <Text style={styles.tocHeader}>Table of Contents</Text>
              {steps.slice(0, 10).map((step, index) => (
                <View key={step.id || index} style={styles.tocRow}>
                  <View style={styles.tocBadge}>
                    <Text style={styles.tocBadgeText}>{index + 1}</Text>
                  </View>
                  <Text style={styles.tocStepTitle}>
                    {step.title || `Step ${index + 1}`}
                  </Text>
                </View>
              ))}
              {steps.length > 10 && (
                <Text style={{ fontSize: 8.5, color: '#94A3B8', marginTop: 4 }}>
                  + {steps.length - 10} more steps
                </Text>
              )}
            </View>
          )}
        </View>

        {/* Cover Footer */}
        <View style={styles.coverFooter}>
          <Text style={styles.coverFooterText}>Generated with StepSnap • Free Scribe Alternative</Text>
          <Text style={styles.coverFooterText}>stepsnap.app</Text>
        </View>
      </Page>

      {/* 2. STEPS CONTENT PAGES */}
      <Page size="A4" style={styles.contentPage}>
        {/* Running Header */}
        <View style={styles.runningHeader} fixed>
          <Text style={styles.runningHeaderTitle}>
            {guide.title || 'Guide Instructions'}
          </Text>
          <Text style={styles.runningHeaderBrand}>StepSnap</Text>
        </View>

        {/* Step Items or Empty State */}
        {steps.length === 0 ? (
          <View style={styles.emptyBox}>
            <Text style={styles.emptyTitle}>No Steps Available</Text>
            <Text style={styles.emptyText}>
              This guide does not currently contain any steps or screenshots.
            </Text>
          </View>
        ) : (
          steps.map((step, index) => (
            <View key={step.id || index} style={styles.stepCard} wrap={false}>
              {/* Step Header */}
              <View style={styles.stepHeaderRow}>
                <View style={styles.stepNumberBadge}>
                  <Text style={styles.stepNumberText}>{index + 1}</Text>
                </View>
                <Text style={styles.stepTitle}>
                  {step.title || `Step ${index + 1}`}
                </Text>
              </View>

              {/* Step Description */}
              {step.description && (
                <Text style={styles.stepDescription}>{step.description}</Text>
              )}

              {/* Step Screenshot Image */}
              {step.imageUrl && (
                <View style={styles.imageWrapper}>
                  <Image src={step.imageUrl} style={styles.stepImage} />
                </View>
              )}
            </View>
          ))
        )}

        {/* Running Footer with Dynamic Page Numbers */}
        <View style={styles.runningFooter} fixed>
          <Text style={styles.runningFooterText}>
            StepSnap Documentation • {guide.title}
          </Text>
          <Text
            style={styles.runningFooterText}
            render={({ pageNumber, totalPages }) => `Page ${pageNumber} of ${totalPages}`}
          />
        </View>
      </Page>
    </Document>
  );
};

export default GuidePdf;
