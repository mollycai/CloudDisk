package middleware

import (
	"fmt"
	"io"
	"os"
	"time"
)

type LogLevel int

const (
	LevelDebug LogLevel = iota
	LevelInfo
	LevelWarning
	LevelError
	LevelFatal
)

type Logger struct {
	level   LogLevel
	writers []io.Writer
}

func NewLogger(level LogLevel, writers ...io.Writer) *Logger {
	return &Logger{
		level:   level,
		writers: writers,
	}
}

func (l *Logger) log(level LogLevel, format string, args ...interface{}) {
	if level < l.level {
		return
	}

	levelStr := ""
	switch level {
	case LevelDebug:
		levelStr = "DEBUG"
	case LevelInfo:
		levelStr = "INFO"
	case LevelWarning:
		levelStr = "WARNING"
	case LevelError:
		levelStr = "ERROR"
	case LevelFatal:
		levelStr = "FATAL"
	}

	msg := fmt.Sprintf(format, args...)
	timestamp := time.Now().Format("2006-01-02 15:04:05")
	logEntry := fmt.Sprintf("[%s] %s: %s\n", timestamp, levelStr, msg)

	for _, writer := range l.writers {
		fmt.Fprint(writer, logEntry)
	}

	if level == LevelFatal {
		os.Exit(1)
	}
}

// 不同级别的方法
func (l *Logger) Debug(format string, args ...interface{}) {
	l.log(LevelDebug, format, args...)
}

func (l *Logger) Info(format string, args ...interface{}) {
	l.log(LevelInfo, format, args...)
}

func (l *Logger) Warning(format string, args ...interface{}) {
	l.log(LevelWarning, format, args...)
}

func (l *Logger) Error(format string, args ...interface{}) {
	l.log(LevelError, format, args...)
}

func (l *Logger) Fatal(format string, args ...interface{}) {
	l.log(LevelFatal, format, args...)
}
