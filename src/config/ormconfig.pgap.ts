import { DataSource, DataSourceOptions } from "typeorm";
import {
  VisibleAlphaCorrelationRecommendation,
  VisibleAlphaStandardMetric,
} from "~src/svc/modules/correlations";
import {
  Document,
  DocumentData,
  DocumentInsight,
  DocumentSummary,
} from "~src/svc/modules/documents";
import { EarningsCallSchedule } from "~src/svc/modules/ec-state-machine/entities";
import { QuantInsight, QuantInsightTrend } from "~src/svc/modules/insights";
import { Keyword, KeywordSuggestion } from "~src/svc/modules/keywords";
import { CuratedManagementQuestion } from "~src/svc/modules/management-questions";
import {
  QuantReadThrough,
  Segment,
  SegmentData,
  SegmentRelationData,
  SegmentRelationTrend,
  StockSegmentRelation,
} from "~src/svc/modules/read-throughs";
import {
  Etf,
  Industry,
  Sector,
  Stock,
  StockEtfRelation,
  StockTopology,
  StockTopologyMember,
} from "~src/svc/modules/stocks";
import { VaMetric } from "~src/svc/modules/stocks/entities/va-metrics";
import { User } from "~src/svc/modules/users";
import { Guidance } from "~src/svc/modules/guidance";
import { VaMetricsMetadata } from "~src/svc/modules/stocks/entities/va-metrics-metadata";
import { SectorTrend } from "~src/svc/modules/sector-trends/entities";
import { SectorIndustryEntity } from "~src/svc/modules/stocks/entities/sector_industry_entity";
import { WebSearchHistory } from "~src/svc/modules/web-search";

const config: DataSourceOptions = {
  type: "postgres",
  host: process.env.DB_HOST,
  port: parseInt(process.env.DB_PORT),
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  ssl: process.env.DB_SSL === "true",
  synchronize: false,
  ...(process.env.DB_SSL === "true" && {
    extra: {
      ssl: {
        rejectUnauthorized: false,
      },
    },
  }),
  connectTimeoutMS: 15 * 1000,
  maxQueryExecutionTime: 60 * 1000,
  entities: [
    Stock,
    User,
    Industry,
    Sector,
    Document,
    DocumentData,
    DocumentInsight,
    DocumentSummary,
    StockTopology,
    VisibleAlphaStandardMetric,
    StockTopologyMember,
    QuantReadThrough,
    CuratedManagementQuestion,
    QuantInsight,
    QuantInsightTrend,
    VisibleAlphaCorrelationRecommendation,
    Keyword,
    Etf,
    StockEtfRelation,
    Segment,
    StockSegmentRelation,
    SegmentRelationData,
    SegmentData,
    SegmentRelationTrend,
    EarningsCallSchedule,
    VaMetric,
    VaMetricsMetadata,
    Guidance,
    KeywordSuggestion,
    SectorTrend,
    SectorIndustryEntity,
    WebSearchHistory,
  ],
  migrations: ["dist/src/svc/migrations/*.{ts,js}"],
  migrationsTableName: "migrations_typeorm",
  migrationsRun: false,
};

const dataSource = new DataSource(config);

export default dataSource;
