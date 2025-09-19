import { ApplicationConfig, provideZoneChangeDetection, importProvidersFrom } from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';

// Firebase Imports for modern providers
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getAuth, provideAuth } from '@angular/fire/auth';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';
import { provideHttpClient } from '@angular/common/http';

// Feather Icons Imports (NgModule-based)
import { FeatherModule } from 'angular-feather';
import { User, Mail, Lock, ChevronRight, ArrowRight, Menu, Bell, ChevronDown, Camera, Heart, Github, Zap, Paperclip, Target, Briefcase, Award, CheckCircle, Users, UserPlus, BookOpen, Globe, Framer, Monitor, MessageSquare, Check, Star, Mic, StopCircle, Clock, BarChart, Play, Tool, LogOut, Home, MessageCircle, TrendingUp, Settings, PenTool, Book, Filter, Coffee, Volume2, Airplay, Search, Archive, BarChart2, RefreshCcw, MapPin, Slack, Tv, Shuffle, RefreshCw, Volume1, ChevronLeft } from 'angular-feather/icons';

/**
 * Your web app's Firebase configuration.
 */
const firebaseConfig = {
  apiKey: "AIzaSyCBHubfaHV6puI7w4x01lNrGcX_5vm5udE",
  authDomain: "womt-ff66e.firebaseapp.com",
  projectId: "womt-ff66e",
  storageBucket: "womt-ff66e.appspot.com",
  messagingSenderId: "80791240101",
  appId: "1:80791240101:web:16e575f2ce8cd549cb3c4c",
  measurementId: "G-R8MLWB1Q1M"
};

/**
 * An object containing all icons used throughout the application.
 * This makes them available for injection via FeatherModule.
 */
const icons = {
  Camera,
  Heart,
  Github,
  Zap,
  Paperclip,
  Target,
  Briefcase,
  Award,
  CheckCircle,
  ChevronRight,
  ChevronDown,
  Users,
  UserPlus,
  BookOpen,
  Globe,
  Framer,
  Monitor,
  MessageSquare,
  Check,
  Star,
  Mic,
  StopCircle,
  Mail,
  Clock,
  BarChart,
  Play,
  User,
  Lock,
  Tool,
  LogOut,
  Home,
  MessageCircle,
  TrendingUp,
  Settings,
  Bell,
  PenTool,
  Book,
  Filter,
  Coffee,
  Volume2,
  Airplay,
  Menu,
  Search,
  Archive,
  BarChart2,
  RefreshCcw,
  MapPin,
  Slack,
  Tv,
  Shuffle,
  RefreshCw,
  Volume1,
  ChevronLeft
};

/**
 * The main application configuration for your standalone app.
 */
export const appConfig: ApplicationConfig = {
  providers: [
    // --- Core Angular Providers ---
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideHttpClient(),

    // --- Modern Firebase Providers (placed directly in the array) ---
    provideFirebaseApp(() => initializeApp(firebaseConfig)),
    provideAuth(() => getAuth()),
    provideFirestore(() => getFirestore()),

    // --- NgModule-based Providers (wrapped in importProvidersFrom) ---
    importProvidersFrom(
      FeatherModule.pick(icons)
    )
  ]
};
