import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { appConfig } from './app/app.config';
import { importProvidersFrom } from '@angular/core';
import { FeatherModule } from 'angular-feather';
import { Camera, Heart, Github, Zap, Paperclip, Target, Briefcase, Award, CheckCircle, ChevronRight, ChevronDown, Users, UserPlus, BookOpen, Globe, Framer, Monitor, MessageSquare, Check, Star, Mic, StopCircle, Mail, Clock, BarChart, Play, User, Lock, Tool, LogOut, Home, MessageCircle, TrendingUp, Settings, Bell, PenTool, Book, Filter,} from 'angular-feather/icons';
import { routes } from './app/app.routes';  
import { provideRouter } from '@angular/router';

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
  Filter
};

bootstrapApplication(AppComponent, appConfig)
  .catch((err) => console.error(err));