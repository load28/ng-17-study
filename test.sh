PR_TITLE="change title3 #asdfasdf"

if [[ ! $PR_TITLE =~ \#[[:alnum:][:punct:]]+$ ]]; then
  echo "PR title does not meet the condition"
  exit 1
fi

echo "test"
