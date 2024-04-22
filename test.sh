  PR_TITLE="change title3"
  echo "PR title: $PR_TITLE"
  if [[ ! $PR_TITLE =~ #[[:alnum:]]+$ ]]; then
    echo "PR title does not meet the condition"
    exit 1
  fi
